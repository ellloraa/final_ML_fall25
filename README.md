# Reddit & YikYak Controversy and Engagement Modeling

This repository contains the **full data pipeline** for collecting, cleaning, feature-engineering, and modeling Reddit and YikYak-style social media posts. The goal is to predict **engagement** and **controversiality** using text, metadata, sentiment, and temporal features.

This README is written as an **instruction manual**. You should be able to follow it top-to-bottom and reproduce the datasets and models.

This README explains:
- The **folder structure** and what each directory is for
- The **data flow** (raw JSON → cleaned CSV → ML models)
- What each **data processing file does**
- How to **apply the generated CSVs to the models**


## 1. Repository Structure (What Each Folder Means)

```
project_root/
│
├── csv_files/            # FINAL datasets used by models
│
├── data_cleaning/         # ALL preprocessing and feature engineering
│   ├── combine_files.py
│   ├── reddit_controversy_cleaning.py 
│   ├── reddit_engagement_cleaning.ipynb
│   ├── yikyak_engagement_cleaning.ipynb
│   └── reddit_scrape.ipynb
│
├── json_files/             #vRAW data 
│   ├── merged_file.json
│   ├── more_yikyak_posts.jsonl
│ 
│
├── models/                # Machine learning models & evaluation
│   ├── controveriality_models/
│     ├── Logistic_Regression.ipynb
│     ├── RandomForest.ipynb
│     ├── SVM_model.ipynb
│   ├── high_engagement_nmodels/
│     ├── reddit_logistic.ipynb
│     ├── reddit_svm.ipynb
│     ├── reddit_random_forest.ipynb
│     ├── yikyak_logistic.ipynb
│     ├── yikyak_svm.ipynb
│     ├── yiky_random_forest.ipynb
│
├
└── README.md
```
### Folder Rules
- **`json_files/`** → raw input data only  
- **`data_cleaning/`** → transforms data, creates features, defines labels  
- **`csv_files/`** → model-ready data  
- **`models/`** → training, prediction, evaluation


### Important Note About Reddit JSON

> **Normally:** We shouldn't include data in the GitHub repo.
>
> **Exception:** we includeD `merged_file.json` because the Reddit scraping process can only be run **once per dataset**. Each contributor scraped individually and merged the results.  
>
> Including this combined JSON ensures that anyone using the repository can reproduce the datasets and run the models **without needing to re-scrape** Reddit.  

## Step 1 – Scraping Yikyak Data 

**Files:** `reddit_scrape.ipynb`

Run this step **only if you need new Reddit data**.

### What the scraper does
- Fetches posts from multiple subreddits
- Filters out images and videos
- Converts Reddit posts into a **YikYak-style schema**
- Labels posts as controversial or non-controversial

### Output
- `reddit_yikyak_dataset.json`

If this file already exists, you can skip this step.


## 2. How to Use This Repository 

If you just want to run everything quickly:

1. Run **reddit_scrape.ipynb** to collect new Reddit data  
2. Merge raw JSON files with *combine_files.ipynb**
3. Run the **data cleaning scripts** to generate CSVs  
4. Load the CSVs into the **machine learning models**  

## How to Run Everything (Recommended Order)

1. Scrape data
2. Run `combine_features.py`
3. Run Reddit cleaning scripts
4. Run YikYak cleaning script
5. Verify CSVs in `csv_files/`
6. Train and evaluate models in `models/`
# sidechat.js

[![NPM Version](https://img.shields.io/npm/v/sidechat.js)](https://www.npmjs.com/package/sidechat.js?activeTab=versions)
[![GitHub last commit](https://img.shields.io/github/last-commit/micahlt/sidechat.js)](https://github.com/micahlt/sidechat.js)
[![NPM License](https://img.shields.io/npm/l/sidechat.js)]()
[![NPM Downloads](https://img.shields.io/npm/dt/sidechat.js?label=downloads)](https://npmjs.com/package/sidechat.js)
[![npm bundle size](https://img.shields.io/bundlephobia/min/sidechat.js)](https://www.npmjs.com/package/sidechat.js?activeTab=code)


A reverse-engineered API wrapper for [Sidechat/YikYak](https://sidechat.lol) in Node.  Easy to use, documented with JSDoc, and kept up to date as much as possible.  Designed for [Offsides](https://github.com/micahlt/offsides), a third-party Sidechat client for Android devices.  Documentation can be found [here](https://micahlindley.com/sidechat.js).

## Getting Started

> Note: sidechat.js uses the Fetch API released in Node.js 18.  If you're attempting to use it in a lower version of Node you will have to polyfill the fetch requests yourself.

Install sidechat.js with your preferred package manager:

```bash
$ npm install sidechat.js
```

Next, take a look at the [authentication tutorial](https://micahlindley.com/sidechat.js/tutorial-Authentication.html) to find out how to log your client in and begin making requests.