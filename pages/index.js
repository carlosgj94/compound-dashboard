import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Compound from '@compound-finance/compound-js';
import calculateApy from '../apy'

export default function Home({ apys }) {
  const formatPercent = number => `${new Number(number).toFixed(2)}%`
  return (
    <div class="max-w-screen-sm m-auto mt-10">
      <h1 class="text-4xl font-black text-pink-500"> Compound Interest Checker</h1>
    {apys && apys.map(apy => (
      <div 
        key={apy.ticker}
        class="mt-5"
      >
      <div class="widget w-full p-4 rounded-lg border bg-gray-900 active:bg-gray-800 border-gray-800 text-left">
        <img 
          src={`img/${apy.ticker.toLowerCase()}.png`}
          class="w-10"
        />
        <p class="text-md text-pink-200"> {apy.ticker.toUpperCase()}</p>
        <p>
          <span class="text-sm text-pink-200">Interest APY: </span>
          <span class="text-sm font-light text-pink-200"> {formatPercent(apy.supplyApy)}</span>
        </p>

        <p>
          <span class="text-sm text-pink-200">Comp Farming APY: </span>
        <span class="text-sm font-light text-pink-200"> {formatPercent(apy.compApy)}</span>
      </p>

        <p>
          <span class="text-sm text-pink-200">Total APY: </span>
        <span class="text-sm font-light text-pink-200"> {formatPercent(parseFloat(apy.supplyApy) + parseFloat(apy.compApy))}</span>
      </p>
      </div>
      </div>
    ))}
    </div>
  )
}

export async function getServerSideProps(context) {
  const apys = await Promise.all([
    calculateApy(Compound.cDAI, 'DAI'),
    calculateApy(Compound.cUSDC, 'USDC'),
    calculateApy(Compound.cUSDT, 'USDT'),
  ]);

  return {
    props: {
      apys
    }
  }
}
