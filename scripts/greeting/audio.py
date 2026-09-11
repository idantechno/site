# -*- coding: utf-8 -*-
"""
פס הקול של סרטון הברכה — מסונתז מאפס, ללא דגימות חיצוניות.

    python3 scripts/greeting/audio.py

הסאונד מסונתז ולא נלקח מספריית מוזיקה — ולכן אין עליו שום שאלת רישוי,
גם בשימוש מסחרי ובפרסום ממומן.

העיצוב מכוון לתמונה: דרון נמוך בחשכה, נשימה עולה כשהפורטל נפתח,
פעמון אחד ברגע האור, ואז שקט כמעט מוחלט עם כמה נגיעות בזמן הברכה.
"""
import math
import wave
import struct
from pathlib import Path

import numpy as np

SR       = 48_000
DURATION = 15.0
N        = int(SR * DURATION)
t        = np.arange(N) / SR

OUT = Path(__file__).with_name('audio.wav')

# ── סולם: לה־במול מז'ור. חם, פתוח, לא סנטימנטלי ──
Ab2, Eb3, Ab3 = 103.83, 155.56, 207.65
C4, Eb4, Ab4  = 261.63, 311.13, 415.30
Bb4, C5, Eb5  = 466.16, 523.25, 622.25
Ab5           = 830.61


# ── עזרים ─────────────────────────────────────────────────────────────
def fft_filter(x, fc, kind='low', width=0.35):
    """סינון בתחום התדר עם מעבר חלק — נקי ומהיר יותר מלולאת IIR."""
    n = 1 << (len(x) - 1).bit_length()
    X = np.fft.rfft(x, n)
    f = np.fft.rfftfreq(n, 1 / SR)
    lo, hi = fc * (1 - width), fc * (1 + width)
    ramp = np.clip((f - lo) / max(hi - lo, 1e-9), 0, 1)
    curve = 0.5 * (1 + np.cos(np.pi * ramp))          # 1 -> 0 בצורה חלקה
    return np.fft.irfft(X * (curve if kind == 'low' else 1 - curve), n)[:len(x)]


def env(attack, decay, length=None, curve=2.6):
    """מעטפת: עלייה רכה ודעיכה מעריכית."""
    length = length if length is not None else DURATION
    n = int(SR * length)
    e = np.zeros(n)
    a = max(int(SR * attack), 1)
    a = min(a, n)
    e[:a] = np.sin(np.linspace(0, np.pi / 2, a)) ** 2
    if n > a:
        e[a:] = np.exp(-curve * np.arange(n - a) / (SR * decay))
    return e


def place(dst, src, at):
    """מוסיף אירוע לציר הזמן במיקום נתון."""
    i = int(SR * at)
    if i >= len(dst):
        return
    m = min(len(src), len(dst) - i)
    dst[i:i + m] += src[:m]


def bell(freq, amp, decay=3.2, bright=1.0):
    """
    פעמון אדיטיבי. הרמוניות מעט לא־הרמוניות והדעיכה מהירה יותר בגבוהות —
    זה מה שנותן צליל של זכוכית/צ'לסטה במקום סינוס עירום.
    """
    partials = [(1.00, 1.00, 1.00), (2.01, 0.42, 0.62), (3.02, 0.22, 0.40),
                (4.17, 0.12, 0.28), (5.45, 0.090, 0.20), (7.13, 0.050, 0.14),
                (9.52, 0.022, 0.10)]
    length = min(decay * 2.2, 6.0)
    n = int(SR * length)
    tt = np.arange(n) / SR
    out = np.zeros(n)
    for ratio, gain, dec in partials:
        g = gain * (bright ** math.log2(max(ratio, 1.0001)))
        out += g * np.sin(2 * np.pi * freq * ratio * tt) * np.exp(-tt / (decay * dec))
    out *= env(0.004, decay * 0.9, length, curve=0.0001)[:n]   # אטק בלבד
    return out * amp / 1.9


def pad_voice(freq, amp, length, detune=0.004):
    """קול פאד: כמה עותקים מעט מזויפים אחד מהשני, נושמים לאט."""
    n = int(SR * length)
    tt = np.arange(n) / SR
    out = np.zeros(n)
    for k, d in enumerate((-detune, 0.0, detune)):
        f = freq * (1 + d)
        vib = 1 + 0.0016 * np.sin(2 * np.pi * (0.13 + 0.05 * k) * tt + k)
        out += np.sin(2 * np.pi * f * tt * vib + k * 1.7)
        out += 0.22 * np.sin(2 * np.pi * 2 * f * tt * vib + k)   # אוקטבה, חלשה
    return out * amp / 3.0


def reverb_ir(length=3.0, decay=1.9, damp=7500):
    """תגובת הלם סינתטית — רעש שדועך, מסונן. זה מה שמדביק הכול לחלל אחד."""
    n = int(SR * length)
    rng = np.random.default_rng(5787)
    ir = rng.standard_normal(n) * np.exp(-decay * np.arange(n) / SR)
    ir[:int(SR * 0.012)] *= np.linspace(0, 1, int(SR * 0.012))   # בלי קליק בהתחלה
    ir = fft_filter(ir, damp, 'low')
    return ir / np.abs(ir).sum() * 1.1


def convolve(x, ir):
    n = 1 << (len(x) + len(ir) - 1).bit_length()
    y = np.fft.irfft(np.fft.rfft(x, n) * np.fft.rfft(ir, n), n)
    return y[:len(x)]


# ── האַרְגָּזִים: ערוץ יבש וערוץ שהולך לרוורב ─────────────────────────
dry = np.zeros(N)
wet = np.zeros(N)

# ---- הדרון הנמוך: נוכח מהשנייה הראשונה, נושא את החשכה ----------------
low = pad_voice(Ab2, 0.085, DURATION) + pad_voice(Eb3, 0.055, DURATION)
swell = np.clip((t - 0.2) / 2.6, 0, 1) ** 1.5                       # כניסה
swell *= 1 - np.clip((t - 13.2) / 1.8, 0, 1) ** 1.4                 # יציאה
dry += fft_filter(low * swell, 700, 'low')

# ---- הפאד החם: נפתח רק אחרי שהאור מגיע ------------------------------
warm = (pad_voice(Ab3, 0.115, DURATION) + pad_voice(C4, 0.075, DURATION)
        + pad_voice(Eb4, 0.065, DURATION) + pad_voice(Ab4, 0.045, DURATION))
open_env = np.clip((t - 4.85) / 2.2, 0, 1) ** 1.3
open_env *= 1 - np.clip((t - 13.0) / 2.0, 0, 1) ** 1.3
dry += fft_filter(warm * open_env, 3200, 'low') * 0.80

# ---- הניצוץ הראשון: פעמון רחוק, כמעט מתחת לסף ------------------------
place(wet, bell(Eb5, 0.16, decay=4.0, bright=0.55), 0.55)
place(wet, bell(Ab4, 0.10, decay=4.0, bright=0.50), 2.05)

# ---- הנשימה שלפני הפתיחה: רעש מסונן שעולה ---------------------------
rise_len = 1.85
rn = int(SR * rise_len)
rng = np.random.default_rng(11)
noise = rng.standard_normal(rn)
shape = np.linspace(0, 1, rn) ** 2.4
riser = (fft_filter(noise, 900, 'low') * shape * 0.034
         + fft_filter(noise, 3200, 'low') * shape ** 3 * 0.024)
riser *= 1 - np.clip((np.arange(rn) / SR - 1.70) / 0.15, 0, 1)      # חיתוך רך בסוף
place(wet, riser, 3.15)

# ---- רגע האור: אקורד פעמונים. השיא הרגשי היחיד ----------------------
place(wet, bell(Ab4, 0.62, decay=4.6), 4.90)
place(wet, bell(C5,  0.42, decay=4.2), 4.90)
place(wet, bell(Eb5, 0.34, decay=3.8, bright=0.85), 4.92)
place(wet, bell(Ab3, 0.26, decay=5.2, bright=0.6), 4.90)
place(wet, bell(Ab5, 0.15, decay=2.8, bright=0.9), 4.91)

# ---- הברכה: נגיעות בודדות, הרבה אוויר ביניהן ------------------------
place(wet, bell(C5,  0.24, decay=3.6, bright=0.7), 5.35)   # "שנה טובה"
place(wet, bell(Ab4, 0.20, decay=3.6, bright=0.65), 6.25)  # הקו
place(wet, bell(Eb5, 0.14, decay=3.4, bright=0.55), 9.40)  # נשימה בזמן הקריאה
place(wet, bell(Bb4, 0.13, decay=3.4, bright=0.55), 11.05)

# ---- הסיום: הלוגו ---------------------------------------------------
place(wet, bell(Ab4, 0.34, decay=4.4), 12.95)
place(wet, bell(Eb5, 0.24, decay=4.0, bright=0.75), 12.98)
place(wet, bell(Ab5, 0.085, decay=2.6, bright=0.9), 12.96)
place(wet, bell(Ab3, 0.20, decay=5.0, bright=0.55), 13.85)

# ── רוורב + איחוד ────────────────────────────────────────────────────
ir = reverb_ir()
mix = (dry + wet * 0.55 + convolve(wet, ir) * 0.95 + convolve(dry, ir) * 0.14
       + fft_filter(wet, 2600, 'high') * 0.22)

# חיתוך תת־בס — אנרגיה שרמקול של טלפון לא מנגן בכל מקרה
mix = fft_filter(mix, 46, 'high', width=0.5)

# פייד־אין קצר ופייד־אאוט ארוך אל השקט
mix *= np.clip(t / 0.35, 0, 1)
mix *= 1 - np.clip((t - 13.9) / 1.1, 0, 1) ** 1.25

# רוחב סטריאו: השהיה זעירה והפרש גוון בין הערוצים
d = int(SR * 0.011)
left  = mix.copy()
right = np.concatenate([np.zeros(d), mix[:-d]])
left  = left * 0.985 + fft_filter(right, 5000, 'low') * 0.13
right = right * 0.985 + fft_filter(mix, 5000, 'low') * 0.13

stereo = np.stack([left, right], axis=1)
stereo = np.tanh(stereo * 1.05) * 0.97                     # רך, בלי קליפ
stereo /= max(np.abs(stereo).max(), 1e-9)
stereo *= 0.89                                             # ~-1dBFS; loudnorm יעשה את השאר

# ── כתיבה: WAV 24-bit ────────────────────────────────────────────────
ints = np.clip(np.round(stereo * (2 ** 23 - 1)), -(2 ** 23), 2 ** 23 - 1).astype(np.int32)
raw = bytearray()
for sample in ints.reshape(-1):
    raw += struct.pack('<i', int(sample))[:3]

with wave.open(str(OUT), 'wb') as w:
    w.setnchannels(2)
    w.setsampwidth(3)
    w.setframerate(SR)
    w.writeframes(bytes(raw))

peak = float(np.abs(stereo).max())
rms = float(np.sqrt((stereo ** 2).mean()))
print(f'{OUT}  {DURATION:.0f}s  peak {20 * math.log10(peak):.1f} dBFS  '
      f'rms {20 * math.log10(rms):.1f} dBFS')
