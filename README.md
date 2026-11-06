# Pass Validity Checker

A clickable mobile prototype for security personnel checking physical passes at a gate. A guard scans a pass's QR code and sees the holder's details and whether each permit (car, mobile phone) is valid.

This is a design prototype. It has no backend and no real camera or QR scanning, and all names and pass details are made up.

## Run it

It's plain HTML, CSS and JavaScript, with nothing to install. Either:

- Open `index.html` in a browser, or
- Turn on GitHub Pages for the repository (Settings > Pages > Deploy from a branch) and open the link on a phone.

## Try the flow

1. On Home, tap **Scan pass QR code**.
2. On the camera screen, tap the camera view to simulate a scan.
3. On the pass, tap **Validity** on a permit to see its date ranges.
4. Tap **Scan next pass**, then the camera view, to see the next person. The five sample people loop.

Tapping a card under **Recently scanned** opens that person's pass, and the **SDS | Pass Validity Checker** bar returns to Home.

## Sample passes

| ID | Person | Permits |
|---|---|---|
| MI872 | Meera Iyer | Car and mobile, both valid |
| RG415 | Rohan Gill | Car invalid, mobile valid |
| HK764 | Harpreet Kaur | Car and mobile, both invalid |
| VS190 | Vikram Sethi | Car only, valid |
| GB703 | Gurdev Bajwa | Mobile only, valid |

## How validity works

A permit has one or more date ranges. It's valid if the scan date falls inside any of them, and invalid otherwise. A permit that was never issued isn't shown.

The prototype treats every scan as happening on `SCAN_DATE` at the top of `app.js`, so the sample statuses don't change over time. A real app would use the current date.

## Files

- `index.html`: page shell
- `styles.css`: all styling
- `app.js`: sample data, validity logic and screens
- `photos/`: sample portraits

## Photos

The portraits in `photos/` are stock images used as placeholders, and at least one still has a visible watermark. Replace them or license them before using this outside internal review.
