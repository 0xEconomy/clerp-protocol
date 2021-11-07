// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const nft_clases = ['A','B','C','D','E','F','G'];
  const price = Math.floor(Math.random() * 100) + 60;
  const currency = 'ETH';
  const nft_class =  nft_clases[Math.floor(Math.random() * nft_clases.length)]
  res.status(200).json({ price: price, currency: currency, nft_class: nft_class })
}
