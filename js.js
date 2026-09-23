const header = document.querySelector("h1"),
btn = document.querySelector(".click"),
deets = document.querySelector(".deets"),
speed = document.querySelector(".speed"),
debt_cont = document.querySelector(".debt");
let average = [], type_list=[], rolls = 0, delay = 0, money = 0, debt = 0, count = [0, 0], highest;


const lvl = [
{ type: "Chroma", num: 14, threshold: 0.01220703125, cash: 10000000},
  { type: "Gold", num: 13, threshold: 0.0244140625, cash: 5000000},
  { type: "Diamond", num: 12, threshold: 0.048828125, cash: 1000000},
  { type: "Platinum", num: 11, threshold: 0.09765625, cash: 500000},
  { type: "Legendary", num: 10, threshold: 0.1953125, cash: 100000},
  { type: "How?", num: 9, threshold: 0.390625, cash: 50000 },
  { type: "???", num: 8, threshold: 0.78125, cash: 10000},
  { type: "Epic", num: 7, threshold: 1.5625, cash: 5000},
  { type: "Mythic", num: 6, threshold: 3.125, cash: 1000},
  { type: "Rare", num: 5, threshold: 6.25, cash: 500},
  { type: "Uncommon", num: 4, threshold: 12.5, cash: 400},
  { type: "Common", num: 3, threshold: 25, cash: 200},
  { type: "Starter", num: 2, threshold: 70, cash: 100},
  { type: "Bomb", num: 1, threshold: 95, cash: -100},
  { type: "Death", num: 0, threshold: 100, cash: -100000}
];

function getRandomInt(max) {
 return Math.floor(Math.random() * (max));
}
function updateStats(){
    if(debt > 0){
            deets.textContent = `Highest Level: ${highest} | Delay: ${(5000 - delay)/1000} | Cash: ${Math.round(money)} | Debt: ${Math.round(debt*100)}%`;
    }else{
        deets.textContent = `Highest Level: ${highest} | Delay: ${(5000 - delay)/1000} | Cash: ${Math.round(money)}`;
    }
}
function roll(){
    let chance = Math.random();
   
    const outcome = lvl.find(tier => chance <= tier.threshold / 100) || lvl[lvl.length - 1];
    type_list.push(`${outcome.type}`);
    average.push(outcome.num);

    header.textContent = outcome.type;
    header.className = '';
    header.classList.add(outcome.type);

   if(outcome.type != 'Bomb' && outcome.type != 'Death'){
       money += outcome.cash * (1 - debt);
   }else{
       money += outcome.cash;
   }
   rolls++;
}
debt_cont.addEventListener('click', (e) => {

    if(money < 0 && count[0] === 0 && debt.toFixed(1) < 1){
        count[0] = 1;
        debt += 0.1;
        money = 0;
        debt_cont.style.opacity = 0.5;
        updateStats();

        setTimeout((e) => {
            debt_cont.style.opacity = 1;
            count[0] = 0;
        }, 5000);
    }
});
speed.addEventListener('click', (e) => {
    if(money >= 1000 && count[1] === 0 && delay < 5000){
        count[1] = 1;
        delay += 500;
        money -= 1000;
        speed.style.opacity = 0.5;
        updateStats();

        setTimeout((e) => {
            speed.style.opacity = 1;
            count[1] = 0;
        }, 5000);
    }
});
btn.addEventListener('click', (e) => {
   roll();
   btn.classList = 'clicked';

   header.classList.add("slap");
   
   highest = lvl.find(tier => tier.num === Math.max(...average))?.type || "Death";

   updateStats();
   setTimeout((e) => {
       btn.classList = 'regular';
       header.classList.remove("slap");
   }, 5000 - delay);
});





