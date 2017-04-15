---
rid: 1471100
bid: ergodox
rcd: keycode
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
| `LSFT(kc)` | 左 Shift + _kc_ |
| `S(kc)`    | 左 Shift + _kc_ |
| `RSFT(kc)` | 右 Shift + _kc_ |
| `LCTL(kc)` | 左 Ctrl + _kc_ |
| `RCTL(kc)` | 右 Ctrl + _kc_ |
| `LALT(kc)` | 左 Alt + _kc_ |
| `RALT(kc)` | 右 Alt + _kc_ |
| `LGUI(kc)` | 左 GUI (Cmd/Win) + _kc_ |
| `RGUI(kc)` | 右 GUI (Cmd/Win) + _kc_ |
| `HYPR(kc)` | Ctrl + Shift + Alt + Gui + _kc_ |
| `MEH(kc)`  | Ctrl + Shift + Alt + _kc_ |
| `LCAG(kc)` | Ctrl + Alt + Gui + _kc_ |

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

| Keycode      | Desc |
|--------------|------|
| `CTL_T(kc)`  | 長押しで Ctrl 、タップで _kc_ |
| `SFT_T(kc)`  | 長押しで Shift 、タップで _kc_ |
| `ALT_T(kc)`  | 長押しで Alt 、タップで _kc_ |
| `GUI_T(kc)`  | 長押しで Gui 、タップで _kc_ |
| `ALL_T(kc)`  | 長押しで Ctrl + Shift + Alt + Gui 、タップで _kc_ |
| `MEH_T(kc)`  | 長押しで Ctrl + Shift + Alt 、タップで _kc_ |
| `LCAG_T(kc)` | 長押しで Ctrl + Alt + Gui 、タップで _kc_ |

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
