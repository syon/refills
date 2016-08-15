---
bid: ergodox
rid: keycode
title: キーコードまとめ
date: 2016/08/14
layout: refill.jade
---

## Keycode Symbol Table
https://github.com/jackhumbert/qmk_firmware/blob/master/doc/keycode.txt

`KC_*` 形式のキーコードとそのショートネームがリストアップされています。  
`KC_2 ... Keyboard 2 and @` とあるので、英語配列が前提になっていると考えられます。


## Quantum Keycodes
https://github.com/jackhumbert/qmk_firmware/blob/master/quantum/keymap.h

QMK 特有のキーコード、エイリアスがリストアップされています。  
`HYPR(kc)`や`TG(layer)`、`CTL_T(kc)`など、キーマップカスタマイズの際に記述する
Modifier や Layer に関する定義がまとまっており、全体感を把握するのに役立ちます。


## Layer
https://github.com/jackhumbert/qmk_firmware#switching-and-toggling-layers

| Keycode           | Mean           | Desc                                    |
|-------------------|----------------|-----------------------------------------|
| `TO(layer, when)` | GOTO layer     | レイヤー移動（_when_は`1`(ON_PRESS)推奨） |
| `MO(layer)`       | Momentary      | 押している間だけ指定したレイヤー |
| `OSL(layer)`      | One-shot layer | 次の１キーだけ指定したレイヤー |
| `LT(layer, kc)`   | Layer / Tap    | 押している間だけ指定したレイヤー、タップで_kc_ |
| `TG(layer)`       | Toggle layer   | タップして指定したレイヤー、再タップで戻る（※） |
| `DF(layer)`       | Default layer  | デフォルトレイヤーの変更（電源OFFまで継続） |

- ※ 行き先のレイヤーには同じキーに `KC_TRNS` を割り当てる必要あり


## Modifier Keys
https://github.com/jackhumbert/qmk_firmware#fun-with-modifier-keys

| Keycode    | Desc          |
|------------|---------------|
| `LSFT(kc)` | applies left Shift to kc (keycode) - S(kc) is an alias |
| `RSFT(kc)` | applies right Shift to kc |
| `LCTL(kc)` | applies left Control to kc |
| `RCTL(kc)` | applies right Control to kc |
| `LALT(kc)` | applies left Alt to kc |
| `RALT(kc)` | applies right Alt to kc |
| `LGUI(kc)` | applies left GUI (command/win) to kc |
| `RGUI(kc)` | applies right GUI (command/win) to kc |
| `HYPR(kc)` | applies Hyper (all modifiers) to kc |
| `MEH(kc)`  | applies Meh (all modifiers except Win/Cmd) to kc |
| `LCAG(kc)` | applies CtrlAltGui to kc |

#### Samples for Modifier Keys

`LALT(LCTL(KC_DEL))`
: this makes a key that sends Alt, Control, and Delete in a single keypress.

### Shift キーを必要とするキーのショートネーム

| Keycode    | Key |
|------------|-----|
| `KC_TILD`  | ~ |
| `KC_EXLM`  | ! |
| `KC_AT`    | @ |
| `KC_HASH`  | # |
| `KC_DLR`   | $ |
| `KC_PERC`  | % |
| `KC_CIRC`  | ^ |
| `KC_AMPR`  | & |
| `KC_ASTR`  | * |
| `KC_LPRN`  | ( |
| `KC_RPRN`  | ) |
| `KC_UNDS`  | _ |
| `KC_PLUS`  | + |
| `KC_DQUO`  | " |
| `KC_LCBR`  | { |
| `KC_RCBR`  | } |
| `KC_LABK`  | < |
| `KC_RABK`  | > |
| `KC_PIPE`  | &#124; |
| `KC_COLN`  | : |

### Modifier-Tap shortcuts

長押しで Modifier キー、タップで通常キーを実現する `MT(mod, kc)` の簡易記述です。

| Keycode      | Key |
|--------------|-----|
| `CTL_T(kc)`  | LCTL when held and kc when tapped |
| `SFT_T(kc)`  | LSFT when held and kc when tapped |
| `ALT_T(kc)`  | LALT when held and kc when tapped |
| `GUI_T(kc)`  | LGUI when held and kc when tapped |
| `ALL_T(kc)`  | Hyper (all mods) when held and kc when tapped |
| `LCAG_T(kc)` | CtrlAltGui when held and kc when tapped |
| `MEH_T(kc)`  | like Hyper, but not as cool -- does not include the Cmd/Win key, so just sends Alt+Ctrl+Shift. |

#### Samples for Modifier-Tap

`CTL_T(KC_Z)`
: 長押しで `Ctrl` 、タップで `Z`。

`ALL_T(KC_NO)`
: 長押しで `Hyper` 、タップで `何もしない`。

`ALT_T(KC_APP)`
: 長押しで `Alt` 、タップで `APP`。


## Leader key
https://github.com/jackhumbert/qmk_firmware#the-leader-key-a-new-kind-of-modifier

キーの同時押しではなく、押した順番で事前定義したキーを送信する新概念。
`KC_LEAD`に設定したキーをタップしてから、登録したキーコンビネーションを素早く打つことで発火させる。_（未検証）_
