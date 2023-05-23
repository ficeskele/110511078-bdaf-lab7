const { ethers, network } = require("hardhat");
const { BigNumber } = ethers;

const USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
const CUSDC_ADDRESS = '0xc3d688B66703497DAA19211EEdff47f25384cdc3';
const WETH_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';

const ALICE_ADDRESS = '0x0A59649758aa4d66E25f08Dd01271e891fe52199';
const BOB_ADDRESS = '0xF04a5cC80B1E94C69B48f5ee68a08CD2F09A7c3E';

describe("Lab7 test", function(){

    it("homework process",async function (){
        
        await network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [ALICE_ADDRESS],
        });

        await network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [BOB_ADDRESS],
        });

        // Get the USDC contract
        const eth = await ethers.getContractAt("IERC20", WETH_ADDRESS);
        const USDC = await ethers.getContractAt("IERC20", USDC_ADDRESS);
        const cUSDC = await ethers.getContractAt("CometMainInterface", CUSDC_ADDRESS);

        // Get signers
        const AliceWithSigner = ethers.provider.getSigner(ALICE_ADDRESS);
        const signer = ethers.provider.getSigner(BOB_ADDRESS);
            
        // Set the balance of the Alice account to pay fee
        await network.provider.request({
            method: "hardhat_setBalance",
            params: [ALICE_ADDRESS, ethers.utils.hexlify(ethers.utils.parseEther("2000"))]
        });

        // Set the balance of the BOB account
        await network.provider.request({
            method: "hardhat_setBalance",
            params: [BOB_ADDRESS, ethers.utils.hexlify(ethers.utils.parseEther("2000"))]
        });

        // [Print] the USDC balance in the Compound USDC contract
        let allsupply = await USDC.balanceOf(CUSDC_ADDRESS);
        console.log(`USDC balance in the Compound USDC contract : ${ethers.utils.formatUnits(allsupply, 6)} USDC`);

        // Define the amount Alice lends (1000 USDC)
        let amount = ethers.utils.parseUnits("1000", 6);

        // Approve the cUSDC contract to spend USDC
        await USDC.connect(AliceWithSigner).approve(CUSDC_ADDRESS, amount);

        // Supplying USDC to the Compound protocol
        await cUSDC.connect(AliceWithSigner).supply(USDC_ADDRESS,amount);

        // [Print] the USDC balance in the Compound USDC contract
        allsupply = await USDC.balanceOf(CUSDC_ADDRESS);
        console.log(`USDC balance in the Compound USDC contract : ${ethers.utils.formatUnits(allsupply, 6)} USDC`);

        // Bob performs some setup
        // Define the WETH amount to lend 
        amount = ethers.utils.parseUnits("999999", 17);

        // Approve the cUSDC contract to spend WETH
        await eth.connect(signer).approve(CUSDC_ADDRESS, amount);
 
        // Supplying WETH to the Compound protocol
        await cUSDC.connect(signer).supply(WETH_ADDRESS,amount);
 
        // Bob withdraws all the USDC balance in the compound contract 
        await cUSDC.connect(signer).withdraw(USDC_ADDRESS,allsupply);

        //[Print] the USDC balance in the Compound USDC contract, this should be 0, or a very small number close to 0
        allsupply = await USDC.balanceOf(CUSDC_ADDRESS);
        console.log(`USDC balance in the Compound USDC contract after borrowing : ${ethers.utils.formatUnits(allsupply, 6)} USDC`);

        // Alice tries to withdraw 1000 USDC
        amount =await cUSDC.balanceOf(ALICE_ADDRESS);
        try {
            await cUSDC.connect(AliceWithSigner).withdraw(USDC_ADDRESS,amount);
        } catch (error) {
            console.error('Error: ', error.message);
        }
        
    });
});