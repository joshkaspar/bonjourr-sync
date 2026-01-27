# Bonjourr ZenQuotes

This repository provides a **daily quote CSV** for the [Bonjourr](https://github.com/victrme/Bonjourr) browser extension.

A GitHub Action runs once per day, fetches the **ZenQuotes “quote of the day”**, converts it to the CSV format expected by Bonjourr, and publishes it via **GitHub Pages**.

The quote text includes attribution with a link to **[https://zenquotes.io/](https://zenquotes.io/)** to meet ZenQuotes’ API requirements.

## How to use

1. Install the Bonjourr browser extension
2. Open Bonjourr settings → **Quotes**
3. Set **Type** to **URL**
4. Paste the CSV URL:

   ```
   https://joshkaspar.github.io/bonjourr-sync/today.csv
   ```

The quote will update automatically each day.
