import E_auctionProf1 from "../img/main/E_auctionProf1.png";
import E_auctionProf2 from "../img/main/E_auctionProf2.png";
import E_auctionProf3 from "../img/main/E_auctionProf3.png";
import E_auctionProf4 from "../img/main/E_auctionProf4.png";
import E_auctionItem1 from "../img/main/E_auctionItem1.png";
import E_auctionItem2 from "../img/main/E_auctionItem2.png";
import E_auctionItem3 from "../img/main/E_auctionItem3.png";
import E_auctionItem4 from "../img/main/E_auctionItem4.png";

import E_marketProf1 from "../img/main/E_marketProf1.png";
import E_marketProf2 from "../img/main/E_marketProf2.png";
import E_marketProf3 from "../img/main/E_marketProf3.png";
import E_marketProf4 from "../img/main/E_marketProf4.png";
import E_marketItem1 from "../img/main/E_marketItem1.png";
import E_marketItem2 from "../img/main/E_marketItem2.png";
import E_marketItem3 from "../img/main/E_marketItem3.png";
import E_marketItem4 from "../img/main/E_marketItem4.png";

const D_issueList = [1, 2, 3, 4];

const autoAuctionList = [
  {
    profImg: E_auctionProf1,
    address: "0x5c7MMMMd8d7",
    like: 22,
    item: E_auctionItem1,
    title: "Series Kong #1",
    price: 0.5,
    unit: "USDT",
  },
  {
    profImg: E_auctionProf2,
    address: "0x5c7MMMMd8d7",
    like: 22,
    item: E_auctionItem2,
    title: "Series Kong #1",
    price: 0.5,
    unit: "USDT",
  },
  {
    profImg: E_auctionProf3,
    address: "0x5c7MMMMd8d7",
    like: 22,
    item: E_auctionItem3,
    title: "Series Kong #1",
    price: 0.5,
    unit: "USDT",
  },
  {
    profImg: E_auctionProf4,
    address: "0x5c7MMMMd8d7",
    like: 22,
    item: E_auctionItem4,
    title: "Series Kong #1",
    price: 0.5,
    unit: "USDT",
  },
  {
    profImg: E_auctionProf1,
    address: "0x5c7MMMMd8d7",
    like: 22,
    item: E_auctionItem1,
    title: "Series Kong #1",
    price: 0.5,
    unit: "USDT",
  },
  {
    profImg: E_auctionProf2,
    address: "0x5c7MMMMd8d7",
    like: 22,
    item: E_auctionItem2,
    title: "Series Kong #1",
    price: 0.5,
    unit: "USDT",
  },
  {
    profImg: E_auctionProf3,
    address: "0x5c7MMMMd8d7",
    like: 22,
    item: E_auctionItem3,
    title: "Series Kong #1",
    price: 0.5,
    unit: "USDT",
  },
  {
    profImg: E_auctionProf4,
    address: "0x5c7MMMMd8d7",
    like: 22,
    item: E_auctionItem4,
    title: "Series Kong #1",
    price: 0.5,
    unit: "USDT",
  },
];

const marketPlaceList = [
  {
    profImg: E_marketProf1,
    address: "0x5c7MMMMd8d7",
    like: 22,
    item: E_marketItem1,
    title: "Kingkong #1",
    price: 0.5,
    unit: "USDT",
    time: "12h 54m 55s",
  },
  {
    profImg: E_marketProf2,
    address: "0x5c7MMMMd8d7",
    like: 22,
    item: E_marketItem2,
    title: "Kingkong #1",
    price: 0.5,
    unit: "USDT",
    time: "12h 54m 55s",
  },
  {
    profImg: E_marketProf3,
    address: "0x5c7MMMMd8d7",
    like: 22,
    item: E_marketItem3,
    title: "Kingkong #1",
    price: 0.5,
    unit: "USDT",
    time: "12h 54m 55s",
  },
  {
    profImg: E_marketProf4,
    address: "0x5c7MMMMd8d7",
    like: 22,
    item: E_marketItem4,
    title: "Kingkong #1",
    price: 0.5,
    unit: "USDT",
    time: "12h 54m 55s",
  },
  {
    profImg: E_marketProf1,
    address: "0x5c7MMMMd8d7",
    like: 22,
    item: E_marketItem1,
    title: "Kingkong #1",
    price: 0.5,
    unit: "USDT",
    time: "12h 54m 55s",
  },
  {
    profImg: E_marketProf2,
    address: "0x5c7MMMMd8d7",
    like: 22,
    item: E_marketItem2,
    title: "Kingkong #1",
    price: 0.5,
    unit: "USDT",
    time: "12h 54m 55s",
  },
  {
    profImg: E_marketProf3,
    address: "0x5c7MMMMd8d7",
    like: 22,
    item: E_marketItem3,
    title: "Kingkong #1",
    price: 0.5,
    unit: "USDT",
    time: "12h 54m 55s",
  },
  {
    profImg: E_marketProf4,
    address: "0x5c7MMMMd8d7",
    like: 22,
    item: E_marketItem4,
    title: "Kingkong #1",
    price: 0.5,
    unit: "USDT",
    time: "12h 54m 55s",
  },
];

const D_faqList = [
  {
    title: "What is a non-fungible token (NFT)?",
    cont: (
      <p>
        A non-fungible token (NFT) is a cryptographic token that represents a
        unique asset. They function as verifiable proofs of authenticity and
        ownership within a blockchain network. NFTs are not interchangeable with
        each other and introduce scarcity to the digital world.
      </p>
    ),
  },
  {
    title: "How do I create an NFT?",
    cont: (
      <p>
        Click [Create] and choose your file to upload. We currently support JPG,
        PNG, GIF, PDF, MP4, MP3, MPEG, AVI, WAV, and SVG. Please note that your
        NFT cannot be changed or revised once created. To create a revised/new
        NFT, you will have to start the process again.
      </p>
    ),
  },
  {
    title: "How do I buy an NFT?",
    cont: (
      <p>
        For fixed price NFT, click the Purchase button on the product page to
        complete the transaction. If the transaction is successful, the NFT will
        be transferred to the wallet and the seller will receive the funds. In
        the case of auction NFT, you will be eligible to purchase tickets. You
        can check the successful bid at 9:00 AM every day. Transfer is made by
        9:00 PM and you will receive NFT when the transaction is completed.
      </p>
    ),
  },
  {
    title: "How do I sell an NFT?",
    cont: (
      <p>
        To list an NFT for sale, our team will first of all approve the content
        to make sure it’s appropriate for listing. This process usually takes
        4-8 hours. Upon successful approval, your NFT will list immediately on
        the Marketplace as either an auction or fixed price sale, according to
        your preference. Alternatively, you can also choose to list your NFT at
        a fixed time (with a minimum of 12 hours after approval).
      </p>
    ),
  },
  {
    title: "What is NFT Marketplace?",
    cont: (
      <p>
        NFT Marketplace brings together artists, creators, and crypto
        enthusiasts on a single platform to create and trade top NFTs. The
        platform features 3 product lines:
        <br />
        <br />
        • Subscription auction: 12% automatic purchase and sale will take place
        on 3 days.
        <br />
        • Marketplace: NFT issuance, purchase, and bidding by creators around
        the world
        <br />• LUCKY TICKET: You can participate in the subscription auction by
        purchasing a ticket.
      </p>
    ),
  },
];

export {  D_issueList, autoAuctionList, marketPlaceList, D_faqList };
