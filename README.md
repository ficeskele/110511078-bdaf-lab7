# 110511078-bdaf-lab7
![image](https://github.com/ficeskele/110511078-bdaf-lab7/assets/124324882/aa800dec-fd7e-4eae-9e61-3f42f3082f50)

# Scenario
On block number 17228670, [Compound USDC contract](https://etherscan.io/address/0xc3d688B66703497DAA19211EEdff47f25384cdc3#readProxyContract) roughly has 458k in Liquidity.

Write a test script that simulates two actors that do the following actions:

- Alice provides liquidity (1000 USDC) into the Compound USDC contract
- Bob borrows out all the liquidity from Compound USDC contract.
    - There are some setup required : )
- Alice tries to withdraw, what happens here?

The picture belowed is what we get if we try to withdraw when Compound has no liquidity.
---
![image](https://github.com/ficeskele/110511078-bdaf-lab7/assets/124324882/0a2ad768-a80e-4549-b944-c3274be3b855)

