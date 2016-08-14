---
bid: ergodox
rid: keycode
title: キーコードまとめ
date: 2016/08/14
layout: refill.jade
---

## Keycode Symbol Table
https://github.com/jackhumbert/qmk_firmware/blob/master/doc/keycode.txt


## Layer


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

### Samples for Modifier Keys

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
