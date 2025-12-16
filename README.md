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
├── json_files/             #RAW data 
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
├-- README.md
└── backfill.js          # YikYak Scraper
```
### Folder Rules
- **`json_files/`** → raw input data only  
- **`data_cleaning/`** → transforms data, creates features, defines labels  
- **`csv_files/`** → model-ready data  
- **`models/`** → training, prediction, evaluation


### Important Note About Reddit JSON

> **Normally:** We shouldn't include data in the GitHub repo.
>
> **Exception:** We included `merged_file.json` because the Reddit scraping process can only be run **once per dataset**. Each contributor scraped individually and merged the results.  
>
> Including this combined JSON ensures that anyone using the repository can reproduce the datasets and run the models **without needing to re-scrape** Reddit.  

## Step 1 – Scraping Yikyak Data 


### How to generate (`more_yikyak_posts.jsonl`)

**File:** `backfill.js`  

This script fetches posts from Sidechat API and writes them into a JSONL file, which is later used for cleaning and feature engineering.

**Requirements:**
- Node.js installed
- `.env` file with `SIDECHAT_TOKEN` from Sidechat

**Environment Setup:**
```bash
npm install
echo "SIDECHAT_TOKEN=your_token_here" > .env
```


## Step 2 – Cleaning YikYak Data

**File:** `yikyak_engagement_cleaning.ipynb`  

Once you have `more_yikyak_posts.jsonl` (generated via `backfill.js`), you can run all cells inside this script to clean the data and generate features.

### What this script does
- Preprocesses text (emoji normalization, lowercasing, URL/mention removal)
- Computes sentiment features (TextBlob + VADER)
- Adds disagreement, conflict, punctuation, capitalization, and pronoun features
- Extracts temporal features (hour, day, weekend)
- Generates **burstiness features** (activity over past 2 hours)
- Assigns **high_engagement labels** (top 10% vote totals)

### Output  
- `csv_files/yikyak_metadata.csv` → ready for engagement models ONLY located 

**Usage:**  
- This CSV can only be used for engagement models in `models/high_engagement_models/yikyak_*`

## Step 3 – Running YikYak Engagement Models

**Files:** `models/high_engagement_models/yikyak_*`  

- Load `csv_files/yikyak_metadata.csv` into your model script
- Train Logistic Regression, SVM, or Random Forest, and see evaluations by running all cells

**Important:**  
Make sure your CSV paths are correct when loading the data.


## Step 4 – Cleaning Reddit Data

### 4.1 Engagement

**File:** `reddit_engagement_cleaning.ipynb`

- Loads `merged_file.json` (already included in repo)
- Creates `high_engagement` label (top 10% comment-to-upvote ratio)
- Generates similar features as YikYak (sentiment, pronouns, temporal, etc.)

**Output:**  
- `csv_files/engagement_reddit.csv` → for Reddit engagement models ONLY

**Usage:**  
- This CSV can only be used for engagement models in `models/high_engagement_models/reddit_*`

**Important:**  
Make sure your CSV paths are correct when loading the data.

### 4.2 Controversiality

**File:** `reddit_controversy_data_cleaning.ipynb`

- Generates features for **controversial vs. non-controversial posts**
- Includes sentiment, disagreement, pronoun, and temporal features

**Output:**  
- `csv_files/reddit_df_more_features.csv` → for controversiality models ONLY

**Usage:**  
- This CSV can only be used for controversial models in  `models/controversiality_models/`

**Important:**  
Make sure your CSV paths are correct when loading the data.


## Step 5 – General Notes on CSV Usage
1. For **YikYak engagement**, run `yikyak_engagement_cleaning.ipynb` → load `yikyak_metadata.csv`.
2. For **Reddit engagement**, run `reddit_engagement_cleaning.ipynb` → load `engagement_reddit.csv`.
3. For **Reddit controversiality**, run `reddit_controversy_cleaning.py` → load `reddit_df_more_features.csv`.



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