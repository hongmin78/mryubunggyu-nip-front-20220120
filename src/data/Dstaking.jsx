import E_prof1 from "../img/staking/E_prof1.png";
import E_prof2 from "../img/staking/E_prof2.png";
import E_prof3 from "../img/staking/E_prof3.png";

const D_vaultHeader = ["Stake", "Staking Amount", "Start", "Ended", ""];

const D_vaultList = [
  {
    img: E_prof1,
    name: "Lucky ticket",
    amount: 100,
    start: "2022-01-22 11:00:00",
    end: "2022-01-22 11:00:00",
  },
  {
    img: E_prof2,
    name: "Kinkong # 344",
    amount: 372,
    start: "2022-01-22 11:00:00",
    end: "2022-01-22 11:00:00",
  },
  {
    img: E_prof3,
    name: "Kinkong # 156",
    amount: 372,
    start: "2022-01-22 11:00:00",
    end: "2022-01-22 11:00:00",
  },
];

const D_rewardHeader = ["Earned item", "Staking Amount", "APY", "Reward Distribution Cycle", "Earned"];

const D_rewardList = [
  {
    img: E_prof2,
    name: "Kinkong # 344",
    amount: 3.36,
    apy: 30,
    cycle: "Year",
    earned: 11,
  },
  {
    img: E_prof3,
    name: "Kinkong # 156",
    amount: 3.36,
    apy: 30,
    cycle: "Year",
    earned: 11,
  },
];

export { D_vaultHeader, D_vaultList, D_rewardHeader, D_rewardList };
