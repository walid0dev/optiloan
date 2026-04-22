# OptiLoan Project Brief

## One-line summary
Build React SPA to compare loan offers and visualize capital growth with compound interest.

## Why this matters
- Loan offers hard to compare across providers.
- Key values differ: rate, duration, total cost.
- Compound interest growth feels abstract to many users.

## Scope
Use static data. Focus on:
- UI construction
- component structure
- props-based data flow
- simple logic with functions and loops

## Core features

### 1) Offer list
Show card per offer with:
- provider (bank)
- amount
- interest rate

### 2) Offer details
On card click, display:
- duration (years)
- monthly payment
- total cost (principal + interest)

### 3) Recommended badge
Mark offer with lowest interest rate as Recommended.

## Bonus feature

### 4) Capital growth simulation
Create function to simulate year-by-year compound growth.

Per year:
- calculate interest
- add interest to capital
- store result

Formula:

A = P(1 + r)^n

Variables:
- P = initial capital
- r = interest rate
- n = number of years
- A = final amount

Interest applies to initial capital plus accumulated interest.

## Done when
- User can compare offers quickly.
- User can open one offer and see full cost breakdown.
- Lowest-rate offer is visibly recommended.
- Bonus chart/list shows yearly compounded growth.