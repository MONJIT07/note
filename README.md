# ⚡ Transmission Line Overcurrent Protection — MATLAB/Simulink

A **3-phase transmission line fault detection and protection system** developed using **MATLAB/Simulink**, featuring overcurrent relay logic, current transformer (CT) modelling, Butterworth low-pass filtering, and automated circuit-breaker tripping.

---

## 🔎 System Overview

A **20 km, 132 kV transmission line** is modelled using distributed parameters. A **3-phase fault** is injected at the midpoint of the line.

The **CT & Relay subsystem** continuously monitors the three-phase currents, detects abnormal overcurrent conditions, and generates a **TRIP SIGNAL** to open circuit breakers at both ends of the transmission line.

---

## ⚙️ System Parameters

### 🔌 Transmission Line

| Parameter                 |                Value |
| ------------------------- | -------------------: |
| 📏 Length                 |                20 km |
| 🔴 R1 (Positive Sequence) |     0.045531917 Ω/km |
| 🔴 R0 (Zero Sequence)     |     0.151489359 Ω/km |
| 🌀 L1 (Positive Sequence) | 0.0006176566224 H/km |
| 🌀 L0 (Zero Sequence)     |  0.001533982723 H/km |
| ⚡ C1 (Positive Sequence)  |    0.013 × 10⁻⁸ F/km |
| ⚡ C0 (Zero Sequence)      |   0.0085 × 10⁻⁸ F/km |

### 🔋 Source

| Parameter          |              Value |
| ------------------ | -----------------: |
| ⚡ Voltage          |             132 kV |
| 📡 Frequency       |              50 Hz |
| 💥 SC MVA (Local)  |              2 GVA |
| 💥 SC MVA (Remote) |              1 GVA |
| 📐 X/R Ratio       | 7 (Local & Remote) |

### 🛡️ CT & Relay

| Parameter               |                    Value |
| ----------------------- | -----------------------: |
| 🔄 CT Ratio             | 500/1 A (Local & Remote) |
| 🎚️ LPF Type            |              Butterworth |
| 📉 LPF Cutoff Frequency |                500 rad/s |

---

## 🏗️ Model Architecture

```text
             ⚡ 3-Phase Source
                     │
             🔌 Circuit Breaker
                (Local End)
                     │
              Transmission
               Line — Part 1
                     │
              ⚠️ 3-Phase Fault
                     │
              Transmission
               Line — Part 2
                     │
             🔌 Circuit Breaker
               (Remote End)
                     │
                  🔋 Load


        🛡️ CT & Relay Subsystem
                     │
        Phase Currents Measurement
                     ↓
              🔄 CT Ratio Scaling
                     ↓
             📉 Butterworth LPF
                     ↓
             📊 Magnitude Extraction
                     ↓
             🎯 Threshold Comparison
                     ↓
                  🔀 OR Gate
                     ↓
              🚨 TRIP SIGNAL
                     ↓
                  🔄 NOT
                     ↓
             🔌 CB Control
```

---

## 🛡️ CT & Relay Subsystem

### 1. 🔄 CT Ratio Scaling

The local and remote three-phase currents are scaled according to the **500/1 A CT ratio** using `f(u)` functions.

### 2. 📉 Butterworth Low-Pass Filtering

A **Butterworth low-pass filter** with a cutoff frequency of **500 rad/s** is applied independently to each phase to attenuate high-frequency components following fault initiation.

### 3. 📊 Magnitude Extraction & Comparison

The filtered phase currents are converted into their corresponding magnitudes and compared against a predefined **overcurrent pickup threshold**.

### 4. 🚨 Trip Logic

Individual phase trip signals are combined using an **OR gate**. If any phase exceeds the pickup threshold, a **TRIP SIGNAL** is generated.

The trip signal is then processed through a **NOT gate** to provide the appropriate circuit-breaker control command.

---

## 📈 Simulation Results

The simulation demonstrates the following protection sequence:

* ⚠️ A **3-phase fault** is introduced at the midpoint of the 20 km transmission line.
* 📊 Fault current rises significantly above the normal operating level.
* 🛡️ The overcurrent relay detects the abnormal current condition.
* ⚡ The relay generates a **TRIP SIGNAL within milliseconds**.
* 🔌 Circuit breakers at both ends receive the trip command.
* 🛑 The transmission line is isolated from the fault.
* ✅ The model is validated for a **3-phase-to-ground fault condition**.

---

## 🧰 Tools & Requirements

* 💻 **MATLAB R2023 or later**
* 📐 **Simulink**
* ⚡ **Simscape Electrical** (formerly SimPowerSystems)

---

## 📁 Project Files

| File                   | Description                             |
| ---------------------- | --------------------------------------- |
| `TransmissionLine.slx` | ⚡ Main MATLAB/Simulink simulation model |
| `README.md`            | 📘 Project documentation                |

---

## 🚀 How to Run

1. 💻 Open `TransmissionLine.slx` in **MATLAB/Simulink**.
2. 🧰 Ensure that **Simscape Electrical** is installed and configured.
3. ▶️ Start the simulation using **Run** or `Ctrl + T`.
4. 📊 Observe the Scope outputs for:

   * Phase currents
   * Filtered currents
   * Relay response
   * 🚨 **TRIP SIGNAL**
5. 🔌 Verify that the circuit breakers operate and isolate the faulted transmission line.

---

## 🎓 Engineering Relevance

This project demonstrates practical concepts used in **electrical power-system protection**, including:

* 🛡️ Overcurrent protection
* 🔄 Current transformer modelling
* 📉 Signal filtering
* ⚡ Transmission-line fault analysis
* 🚨 Relay trip logic
* 🔌 Circuit-breaker operation
* 🏭 Substation protection principles

The project is particularly relevant to protection systems used in **132/33 kV and 220/132 kV substations**, connecting simulation-based analysis with practical power-system protection concepts observed during internship exposure at **AEGCL, Mariani, Assam**.

---

## 👨‍💻 Author

**Monjit Tamuli**
🎓 B.Tech — Electrical Engineering, NIT Silchar (2027)

🔗 [LinkedIn](https://www.linkedin.com/in/monjit-tamuli) | [GitHub](https://github.com/MONJIT07)

---

## ⭐ Project Highlights

> ⚡ **132 kV Transmission Line**
> 🛡️ **3-Phase Overcurrent Protection**
> 🔄 **500/1 A CT Modelling**
> 📉 **Butterworth Low-Pass Filtering**
> 🚨 **Automatic Fault Detection & Trip Logic**
> 🔌 **Dual-End Circuit-Breaker Isolation**
> 📊 **MATLAB/Simulink Based Simulation**
