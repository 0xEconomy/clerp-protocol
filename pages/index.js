import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import { ethers } from "ethers";
import { hasEthereum } from "../utils/ethereum";
import Link from "next/link";
import Greeter from "../src/artifacts/contracts/Greeter.sol/Greeter.json";

export default function Home() {
  const [greeting, setGreetingState] = useState("");
  const [newGreeting, setNewGreetingState] = useState("");
  const [newGreetingMessage, setNewGreetingMessageState] = useState("");
  const [connectedWalletAddress, setConnectedWalletAddressState] = useState("");
  const newGreetingInputRef = useRef();

  // If wallet is already connected...
  useEffect(() => {
    if (!hasEthereum()) {
      setConnectedWalletAddressState(`MetaMask unavailable`);
      return;
    }
    async function setConnectedWalletAddress() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      try {
        const signerAddress = await signer.getAddress();
        setConnectedWalletAddressState(`Connected wallet: ${signerAddress}`);
      } catch {
        setConnectedWalletAddressState("No wallet connected");
        return;
      }
    }
    setConnectedWalletAddress();
  }, []);

  // Request access to MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  // Call smart contract, fetch current value
  async function fetchGreeting() {
    if (!hasEthereum()) {
      setConnectedWalletAddressState(`MetaMask unavailable`);
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_GREETER_ADDRESS,
      Greeter.abi,
      provider
    );
    try {
      const data = await contract.greet();
      setGreetingState(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Call smart contract, set new value
  async function setGreeting() {
    if (!hasEthereum()) {
      setConnectedWalletAddressState(`MetaMask unavailable`);
      return;
    }
    if (!newGreeting) {
      setNewGreetingMessageState("Add a new greeting first.");
      return;
    }
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();
    setConnectedWalletAddressState(`Connected wallet: ${signerAddress}`);
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_GREETER_ADDRESS,
      Greeter.abi,
      signer
    );
    const transaction = await contract.setGreeting(newGreeting);
    await transaction.wait();
    setNewGreetingMessageState(
      `Greeting updated to ${newGreeting} from ${greeting}.`
    );
    newGreetingInputRef.current.value = "";
    setNewGreetingState("");
  }

  return (
    <div className="max-w-lg mt-36 mx-auto text-center px-4">
      <Head>
        <title>Clerp Protocol</title>
        <meta
          name="description"
          content="A platform for creating liquid perpetual swap markets for illiquid Non-Fungible Tokens (NFTs)"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="space-y-8">
        {!process.env.NEXT_PUBLIC_GREETER_ADDRESS ? (
          <p className="text-md">
            Please add a value to the <pre>NEXT_PUBLIC_GREETER_ADDRESS</pre>{" "}
            environment variable.
          </p>
        ) : (
          <>
            <h1 className="text-4xl font-semibold mb-8">Clerps</h1>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Leveraged exposure to NFTs. A new derivative primitive.
            </p>
            <div className="space-y-8">
              <div className="flex flex-col space-y-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-md w-full">
                  <Link href="/trades">Trade</Link>
                </button>

                <button className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-md w-full">
                  <Link href="/markers">Markets</Link>
                </button>

                <button className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-md w-full">
                  <Link href="/vaults">Vaults</Link>
                </button>
              </div>

              <div className="h-4">
                {connectedWalletAddress && (
                  <p className="text-md">{connectedWalletAddress}</p>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
