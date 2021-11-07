[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftomhirst%2Fsolidity-nextjs-starter)

# Clerps is a platform for creating liquid perpetual swap markets for illiquid Non-Fungible Tokens (NFTs).

A clerp is synthetic NFT tracks the price of a given rarity class in an NFT project and can be minted by locking up NFTs from that rarity class in that project. 

Clerps give NFT holders access to liquidity and protection against fluctuations in the price of their NFT without requiring them to give up ownership of their NFTs.

## Motivations
Let's say you own a crypto punk, and you bought them when they were 10 ETH each.

Now the floor price of Crypto Punks is 100 ETH.

You love your NFT and do not want to sell them. You use it as your profile picture on Twitter but want some liquidity and protection against future declines.

You could frationalise it on factional.art, but that works if your NFTs are crypto punks, you would have a hard time sourcing liquidity if you had a lesser know NFT. 
Fractional.art also succumbs to the reconstruction problem. They have ways to mitigate it, but the solutions are not perfect. 
Furthermore, suppose someone initiates a buyout auction for your punks. And the auction does not attract much attention or liquidity, potentially leading to a sale at an unfavourable price.

You could put them in a crypto punks vault-like NTFX but your NFT is worth signification more than the floor / mid-price and you don't want to lose your NFT. 


## Solution 
You decide to use your punks as collateral to create and sell PUNK-CLASS perps (A PERP CDP ).

For example, let's say the Punks floor is currently at 100 ETH, and your PUNK is worth at least 130 ETH. 

You open up your web browser and navigate to Clerps marketplace, where your lock your punks as collateral. 
You mint PUNK-CLASS<A-G> CLERPS. e.g. PUNK-D-CLERPS, valued at 130 ETH. 
You sell them to a market maker who creates liquidity for them on uniswap 

## Quick definition of terms used in perpetual swaps
### Mark price 
A perp’s value at any given time is represented This is the price used to calculate profits and losses and trigger liquidations. It is generally based on the trading price of the perp on its exchange. 

### Index price 
for NFT Project classes = The underlier’s value is represented in the system by the index price.

## Funding fee
When the index price and the mark price diverge, the system transfers a funding fee between those who are long the perp (have bought it) and those who are short the perp (have sold it). In our example perp, the funding fee paid by the longs to the shorts is $(mark price - index price) per contract per day. When this number is negative, the shorts pay the longs.

## Margin 
Traders  collateral. When the mark price moves against the trader, the resulting losses are deducted from this margin. If the margin balance gets too low, the trader will be liquidated, meaning their position is automatically closed out.

### Feedback control system: 
For example, a thermostat which keeps a value near a set point by applying increasing force as it strays. The colder your house gets relative to your desired temperature, the higher your thermostat will crank the heater.

Similarly, our perp wants its mark price to equal its index price. It attempts to achieve this by charging the funding rate of $(mark price - index price) per contract per day

If `Mark price > Index price`, longs will pay shorts `(mark - index)`. And vice versa. 

Interest 100% per day. I.e `(Mark price - index price) / 24 per hour`. 

Traders must put down margin to enter into their  position. This is meant cover any losses that might occur before the positions can be liquidated.

## User types
### User A 
Wants access to liquidity and protection against fluctuations in the price of their NFT without requiring them to give up ownership of their NFTs. 

### User B 
Wants to put their ETH to work by providing liquidity to new an innovative markets that could earn them trading and protocol fees

### User C 
NFTs are typically highly illiquid and difficult to price. Clerps makes speculating with leverage (long or short) and investing in the NFT market a far simpler process:

## UX

### User A 
Create Vault
- Connect your wallet 
- See list of all your Nfts that can be deposited
- Select an NFT 
- See estimated price and class of your NFT 
- Deposit the NFT as a collateral and get a clerp per NFT
- Recieve a clerp (which)


### User B 
Create market 
- Connect your wallet 
- See a list of clerps which you can create a market for 
- Buy the clerp (or a fraction of the clerp) from User A 
- Add liquidity on uniswap 

### User C 
Exchange 
- Long 
    - ETH / Clerp 
    - Margin (Trader’s collateral in ETH) 
    - Leverage (dynamically allocated based on market liquidity. More on this later) 
- Short 
    - ETH / Clerp 
    - Margin  (An NFT in that class or ETH) 
    - Leverage (dynamically allocated based on market liquidity) 

## Determining the class and price of an NFT

### Step 1: Classification
Divide the NFT project into classes from A-G based on the rarity of the NFT. 
- Class A (Top 1% rarity score). 
- Class G (Bottom 20% rarity score) 

In the case of crypto punks with 10K collection. 
- Punks with rarity score from 0 - 100 get class A. 
- Punks with rarity score from 8K - 10K get class G. 

### Step 2: Ingestion
Get the most recent sale events on the Ethereum blockchain for PUNKS. 

### Step 3: Indexification 
- Create an index price for each class. 
- Map avg sales price for each class to determine an index price, which is time-weighted 
- For classes with no sales e.g. Class A Punks who have diamond hands, use logistic interpolation to determine a price. 
- Also, using actual time-weighted sales data makes it less susceptible to manipulation. 

### Step 4: Modification 
When there's a new sale event,  update the index price for each class. 

## Trading venue: 
Unlike eth or btc, which can be traded anywhere, your standard perp is native to a particular exchange and can only be traded there. 
Clerps will the traded on UniSwap.

## Mark price
The mark price is the price on the UniSwap.

### Index price
The index price is the price of the NFT class that is dynamically calculated based on the sales events of that NFT on the ethereum blockchain.

### Margin
User C shorts can collateralise their position with an NFT from the same class. 
User C longs collateralise with ETH 


### Funding 
Funding for clerps follows the standard formulation: once per funding period, say, daily, longs must pay shorts MARK-INDEX, most likely denominated in ETH.

In order to guarantee longs will be able to get liquidity when they close their positions, we don't want shorts to accure cash-demonited funding debt. Instead, if shorts must pay funding to longs, the system will have them pay funding in form of additional clerps. 

For example, imagine mark price is 100 eth and  index price is 100.2 eth at funding time, so that shorts must pay longs INDEX-MARK = 0.2 ETH. 
Imaging Alice is short 0.5 clerps, collateralised by an NFT. Instead of liquidating her, the system will mint an additional 0.001 clerps. `(Since FUNDING/MARK*pos= 0.2/100*0.5 = 0.001)` on her behalf, so she is now short 0.501 clerps. It will then distribute the additional long position amongst the longs in lieu of cash funding. 

In the example above, if Alice had been short 0.985 floor clerps already and the system had to mint roughly an additional 0.01 clerps on her behalf so that she was now short 0.995 clerps, she would be dangerously close to underwater and the system might liquidate her depending on its liquidation parameters. This is the only way in which NFT-backed shorts can get liquidated, as we explain below.

## Liquidation criteria for NFT-Backed shorts 
- `Q = Short amount  = (0 < Q < 1) `
- `M1 = mark price `
- `I1 index price` 

The shorts are underwater if `QM1 > I1` 

This means shorts will the liquidated anytime M1 spike high enough. 
To minimise NFT liquidations, we use the index price. 
The shorts are underwater if

`QI1 > I1  <=> (1 - Q)I1 < 0 `

## Auctions 
If NFT-backed shorts do have to be liquidated, their NFTs will be auctioned off, with the proceeds used to buy back their short positions and any overage going back to original holder of the NFT.

## Liquidity and Dynamic Collateralisation Requirements
Allowing shorts to collateralise their positions with NFTs instead of cash can expose the system to liquidity problems in certain circumstances.

For example, imagine Alice sells one clerp using one NFT as collateral, which Bob buys at a price of 1 ETH. The price of the perp then jumps to 6 ETH. Bob is ready to take 5 ETH of profits on his long, and Charlie would like to buy in.
Now, if the protocol allowed Charlie to buy at 2X leverage, he would only need to deposit 3 ETH. However, even if Alice hadn’t withdrawn any ETH from her original sale, Charlie’s 3 ETH deposit plus the 1 ETH already in the system adds up to only 4 ETH, not enough for Bob to take his 5 ETH profit from his sale.

As a result, whenever the system is undercapitalised, we will increase the collateral requirements for new buyers in order to ensure adequate liquidity for sellers.

