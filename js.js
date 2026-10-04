const header = document.querySelector("h1"),
btn = document.querySelector(".click"),
deets = document.querySelector(".deets"),
speed = document.querySelector(".speed"),
debt_cont = document.querySelector(".debt"),
stats = document.querySelector('.stats'),
multiplier = document.querySelector('.multiplier'),
center = document.querySelector('.center'),
block = document.querySelector('.block'),
levelincrease = document.querySelector('.levelincrease');
let average = [], type_list=[], rolls = 0, rollsUntil=0, delay = 0, money = 0, debt = 0, count = [0, 0, 0, 0, 0], highest, mult=1, streak=0, streakLimit=1, level=0, blocked=false;


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

    if(rollsUntil > 0){
        stats.innerHTML = `
            Muliplication: ${Number(mult).toFixed(2)}x<br>
            Debt Paid Off: ${rollsUntil} rolls<br><br>
            <h2 style="line-height: 0px;">Level ${level}</h2><br>
            <p style="text-align: center;font-size: 1.2em;">${Math.round((streak/streakLimit) * 100)}% (${streak}/${streakLimit})</p>
        `;
        if(blocked === true){
             stats.innerHTML = `
                Muliplication: ${Number(mult).toFixed(2)}x<br>
                Debt Paid Off: ${rollsUntil} rolls<br>
                BLOCKED Death and Bomb<br>
                <h2 style="line-height: 0px;">Level ${level}</h2><br>
                <p style="text-align: center;font-size: 1.2em;">${Math.round((streak/streakLimit) * 100)}% (${streak}/${streakLimit})</p>
            `;
        }
    }else{
        stats.innerHTML = `
            Muliplication: ${Number(mult).toFixed(2)}x<br><br><br>
            <h2 style="line-height: 0px;">Level ${level}</h2><br>
            <p style="text-align: center;font-size: 1.2em;">${Math.round((streak/streakLimit) * 100)}% (${streak}/${streakLimit})</p>
        `;
        if(blocked === true){
             stats.innerHTML = `
                Muliplication: ${Number(mult).toFixed(2)}x<br>
                BLOCKED Death and Bomb<br><br>
                <h2 style="line-height: 0px;">Level ${level}</h2><br>
                <p style="text-align: center;font-size: 1.2em;">${Math.round((streak/streakLimit) * 100)}% (${streak}/${streakLimit})</p>
            `;
        }
    }

    center.style.width = `${(streak/streakLimit) * 100}%`;
    if(streak >= streakLimit){
        streakLimit *= 2;
        mult += 0.05;
        level++;
    }
}
updateStats();
function roll(){
    let chance = Math.random();
   
    const outcome = lvl.find(tier => chance <= tier.threshold / 100) || lvl[lvl.length - 1];
    type_list.push(`${outcome.type}`);
    average.push(outcome.num); 

    if(outcome.type == 'Bomb'){
        if(blocked === true){
            header.textContent = "BLOCKED";
        }else{
            header.textContent = outcome.type + "💣";
        }
    }else if(outcome.type == 'Death'){
        if(blocked === true){
            header.textContent = "BLOCKED";
        }else{
            header.textContent = outcome.type + "💀";
        }
    }else{
        header.textContent = outcome.type;
    }
    
    header.className = '';
    header.classList.add(outcome.type);

   if(outcome.type != 'Bomb' && outcome.type != 'Death'){
       money += outcome.cash * (1 - debt) * mult;
       streak++;
   }else{
        if(blocked === false){
            money += outcome.cash;
            streak = 0;
        }
   }
   rolls++;
   rollsUntil--;
   if(rollsUntil <= 0){
       debt = 0;
       rollsUntil = 0;
   }
}
debt_cont.addEventListener('click', (e) => {

    if(money < 0 && count[0] === 0 && Number(debt).toFixed(1) < 1){
        count[0] = 1;
        debt += 0.1;
        money = 0;
        debt_cont.style.opacity = 0.5;
        rollsUntil += 100;
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
multiplier.addEventListener('click', (e) => {
    if(money >= 3000 && count[2] === 0){
        count[2] = 1;
        money -= 3000;
        mult += 0.1;
        multiplier.style.opacity = 0.5;
        updateStats();

        setTimeout((e) => {
            multiplier.style.opacity = 1;
            count[2] = 0;
        }, 10000);
    }
});
block.addEventListener('click', (e) => {
    if(money >= 10000 && count[3] === 0){
        count[3] = 1;
        money -= 10000;
        blocked = true;
        block.style.opacity = 0.5;
        updateStats();

        setTimeout((e) => {
            block.style.opacity = 1;
            count[3] = 0;
            blocked = false;
            updateStats();
        }, 600000);
    }
});
levelincrease.addEventListener('click', (e) => {
    if(money >= 1000 && count[4] === 0){
        count[4] = 1;
        money -= 1000;
        levelincrease.style.opacity = 0.5;
        level++;
        streakLimit *= 2;
        mult += 0.05;
        updateStats();

        setTimeout((e) => {
            levelincrease.style.opacity = 1;
            count[4] = 0;
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




