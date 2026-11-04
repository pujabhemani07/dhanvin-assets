(()=>{'use strict';
const defs=[
['swp','SWP Calculator','Withdrawal plan',[['corpus','Starting corpus (₹)',1000000],['withdrawal','Monthly withdrawal (₹)',10000],['rate','Annual return (%)',8],['years','Years',10]]],
['sip','SIP Calculator','Monthly investment growth',[['monthly','Monthly SIP (₹)',5000],['rate','Annual return (%)',12],['years','Years',15]]],
['epf','EPF Calculator','Employee and employer EPF projection',[['salary','Monthly basic + DA (₹)',30000],['employee','Employee share (%)',12],['employer','Employer EPF share (%)',3.67],['balance','Current EPF balance (₹)',0],['rate','Annual interest (%)',8.25],['years','Years',20]]],
['fd','FD Calculator','Fixed deposit maturity',[['principal','Deposit (₹)',100000],['rate','Annual interest (%)',7],['years','Years',3],['frequency','Compounding per year',4]]],
['future-value','Future Value Calculator','Future value of a single amount',[['principal','Present amount (₹)',100000],['rate','Annual growth (%)',10],['years','Years',10]]],
['rd','RD Calculator','Recurring deposit projection',[['monthly','Monthly deposit (₹)',5000],['rate','Annual interest (%)',6.5],['years','Years',2]]],
['gratuity','Gratuity Calculator','Estimate using the common 15/26 formula',[['salary','Last monthly basic + DA (₹)',30000],['years','Completed service years',10]]],
['compound-interest','Compound Interest Calculator','Compounding on a principal',[['principal','Principal (₹)',100000],['rate','Annual interest (%)',8],['years','Years',10],['frequency','Compounds per year',4]]],
['ppf','PPF Calculator','Public Provident Fund projection',[['annual','Annual contribution (₹)',150000],['rate','Assumed interest (%)',7.1],['years','Years',15],['balance','Current balance (₹)',0]]],
['retirement','Retirement Calculator','Estimate retirement corpus and saving',[['age','Current age',30],['retireAge','Retirement age',60],['expense','Current monthly expenses (₹)',50000],['inflation','Annual inflation (%)',6],['rate','Pre-retirement return (%)',10]]],
['ssy','Sukanya Samriddhi Yojana Calculator','Illustrative SSY maturity',[['annual','Annual deposit (₹)',100000],['rate','Assumed interest (%)',8.2],['years','Deposit years',15],['maturity','Maturity horizon (years)',21]]],
['lumpsum','Lumpsum Calculator','One-time investment projection',[['principal','Investment amount (₹)',100000],['rate','Assumed annual return (%)',12],['years','Years',10]]],
['inflation','Inflation Calculator','Future cost of today’s amount',[['amount','Amount today (₹)',100000],['rate','Annual inflation (%)',6],['years','Years',10]]],
['cagr','CAGR Calculator','Annualized compound growth',[['initial','Starting value (₹)',100000],['final','Ending value (₹)',200000],['years','Years',5]]],
['nps','NPS Calculator','NPS corpus and illustrative annuity split',[['monthly','Monthly contribution (₹)',5000],['rate','Annual return (%)',10],['years','Years',25],['annuity','Annuity allocation (%)',40],['annuityRate','Annuity rate (%)',6]]],
['mutual-fund','Mutual Fund Calculator','SIP or lump-sum estimate',[['mode','SIP (1) / Lumpsum (2)',1],['amount','Monthly SIP / lump sum (₹)',5000],['rate','Assumed annual return (%)',12],['years','Years',10]]],
['option-value','Option Value Calculator','Black–Scholes European option estimate',[['spot','Underlying price (₹)',100],['strike','Strike price (₹)',100],['years','Expiry (years)',1],['rate','Risk-free rate (%)',6],['vol','Volatility (%)',20],['kind','Call (1) / Put (2)',1]]],
['emi','EMI Calculator','Monthly loan repayment',[['principal','Loan amount (₹)',1000000],['rate','Annual interest (%)',9],['years','Years',10]]],
['elss','ELSS Calculator','ELSS SIP projection',[['monthly','Monthly SIP (₹)',5000],['rate','Assumed annual return (%)',12],['years','Years',3]]],
['fire','FIRE Calculator','Financial independence target',[['monthly','Monthly expenses (₹)',50000],['withdrawal','Withdrawal rate (%)',4],['inflation','Annual inflation (%)',6],['years','Years to target',10]]]
];
const money=n=>'₹'+Math.round(n).toLocaleString('en-IN');
function result(id,v){let n=v.years*12,r=v.rate/1200,a,invested;
switch(id){
case'swp':{let b=v.corpus;for(let i=0;i<n;i++){b=b*(1+r)-v.withdrawal;if(b<=0)return['Corpus exhausted','The selected withdrawals exceed the projected corpus.'];}return[money(b),'Estimated remaining corpus after withdrawals.'];}
case'sip':a=r?v.monthly*((1+r)**n-1)/r*(1+r):v.monthly*n;invested=v.monthly*n;break;
case'epf':a=v.balance;for(let i=0;i<n;i++)a=(a+v.salary*(v.employee+v.employer)/100)*(1+r);return[money(a),'Illustrative EPF balance. EPS pension is not included.'];
case'fd':a=v.principal*(1+v.rate/100/v.frequency)**(v.frequency*v.years);return[money(a),'Interest earned: '+money(a-v.principal)+'. Tax/TDS excluded.'];
case'future-value':case'lumpsum':a=v.principal*(1+v.rate/100)**v.years;return[money(a),'Estimated growth: '+money(a-v.principal)+'.'];
case'rd':a=r?v.monthly*((1+r)**n-1)/r*(1+r):v.monthly*n;return[money(a),'Deposits: '+money(v.monthly*n)+'; estimated interest: '+money(a-v.monthly*n)+'. Simplified monthly compounding.'];
case'gratuity':return[money(v.salary*15/26*v.years),'Illustration using 15/26 × last monthly basic + DA × completed years. Eligibility and statutory caps apply.'];
case'compound-interest':a=v.principal*(1+v.rate/100/v.frequency)**(v.frequency*v.years);return[money(a),'Compound interest: '+money(a-v.principal)+'.'];
case'ppf':a=v.balance;for(let i=0;i<v.years;i++)a=(a+v.annual)*(1+v.rate/100);return[money(a),'Simplified annual-compounding estimate; actual PPF interest follows notified rules and monthly balance calculations.'];
case'retirement':{let y=Math.max(0,v.retireAge-v.age),m=v.expense*(1+v.inflation/100)**y,c=m*12*25,rr=v.rate/1200,nn=y*12,s=rr&&nn?c*rr/((1+rr)**nn-1)/(1+rr):c/Math.max(nn,1);return[money(c),'Projected monthly expense: '+money(m)+'. Indicative monthly saving: '+money(s)+'. Uses a 25× annual expense heuristic.'];}
case'ssy':a=0;for(let i=0;i<v.years;i++)a=(a+v.annual)*(1+v.rate/100);for(let i=v.years;i<v.maturity;i++)a*=1+v.rate/100;return[money(a),'Illustrative only. Actual SSY rates, eligibility and scheme rules apply.'];
case'inflation':a=v.amount*(1+v.rate/100)**v.years;return[money(a),'Estimated future cost of the amount.'];
case'cagr':if(v.initial<=0||v.final<=0)return['Invalid inputs','Starting and ending values must be positive.'];return[((v.final/v.initial)**(1/v.years)*100-100).toFixed(2)+'%','Annualized compound annual growth rate.'];
case'nps':a=r?v.monthly*((1+r)**n-1)/r*(1+r):v.monthly*n;{let ann=a*v.annuity/100;return[money(a),'Illustrative lump sum: '+money(a-ann)+'. Annuity allocation: '+money(ann)+'. Monthly annuity at assumed rate: '+money(ann*v.annuityRate/1200)+'. NPS exit rules apply.'];}
case'mutual-fund':invested=v.mode===2?v.amount:v.amount*n;a=v.mode===2?v.amount*(1+v.rate/100)**v.years:(r?v.amount*((1+r)**n-1)/r*(1+r):invested);break;
case'emi':{let e=r?v.principal*r*(1+r)**n/((1+r)**n-1):v.principal/n,t=e*n;return[money(e)+' / month','Total repayment: '+money(t)+'. Total interest: '+money(t-v.principal)+'. Fees excluded.'];}
case'elss':a=r?v.monthly*((1+r)**n-1)/r*(1+r):v.monthly*n;invested=v.monthly*n;break;
case'fire':a=v.monthly*12*(1+v.inflation/100)**v.years;return[money(a/(v.withdrawal/100)),'Projected annual expenses: '+money(a)+'. Rule-of-thumb estimate, not a guarantee.'];
case'option-value':{const N=x=>{let z=Math.abs(x),t=1/(1+.2316419*z),d=.3989423*Math.exp(-z*z/2),p=1-d*t*(.3193815+t*(-.3565638+t*(1.781478+t*(-1.821256+t*1.330274))));return x>=0?p:1-p};if(!v.spot||!v.strike||!v.years||!v.vol)return['Invalid inputs','Underlying, strike, expiry and volatility must be positive.'];let s=v.vol/100,t=v.years,rr=v.rate/100,d1=(Math.log(v.spot/v.strike)+(rr+s*s/2)*t)/(s*Math.sqrt(t)),d2=d1-s*Math.sqrt(t),call=v.spot*N(d1)-v.strike*Math.exp(-rr*t)*N(d2),put=v.strike*Math.exp(-rr*t)*N(-d2)-v.spot*N(-d1);return[money(v.kind===2?put:call),'Theoretical Black–Scholes premium. Assumes European exercise, constant volatility/rate and no dividends or costs.'];}
}
return[money(a),'Invested: '+money(invested)+'. Estimated gain: '+money(a-invested)+'. Returns are not guaranteed.'];
}
const host=document.getElementById('calculator-suite-root');if(!host)return;
const index=document.createElement('nav');index.className='calc-index';index.setAttribute('aria-label','Calculator shortcuts');
const grid=document.createElement('div');grid.className='calc-grid';
defs.forEach((d,i)=>{let shortcut=document.createElement('a');shortcut.href='#'+d[0];shortcut.textContent=d[1].replace(' Calculator','');index.append(shortcut);
let card=document.createElement('article');card.className='calc-card';card.id=d[0];let heading=document.createElement('h2');heading.textContent=(i+1)+'. '+d[1];let desc=document.createElement('p');desc.textContent=d[2];let form=document.createElement('form');let fields=document.createElement('div');fields.className='fields';
d[3].forEach(f=>{let label=document.createElement('label');label.textContent=f[1];let input=document.createElement('input');input.type='number';input.min='0';input.step='any';input.required=true;input.value=f[2];input.name=f[0];label.append(input);fields.append(label)});
let button=document.createElement('button');button.type='submit';button.textContent='Calculate';let output=document.createElement('div');output.className='result';output.setAttribute('aria-live','polite');form.append(fields,button,output);form.addEventListener('submit',e=>{e.preventDefault();let v=Object.fromEntries(d[3].map(f=>[f[0],Number(form.elements[f[0]].value)]));let invalid=d[3].some(f=>!Number.isFinite(v[f[0]])||v[f[0]]<0)||d[3].some(f=>['years','maturity','frequency','withdrawal','vol'].includes(f[0])&&v[f[0]]<=0)||(d[0]==='cagr'&&v.initial<=0)||(d[0]==='retirement'&&v.retireAge<v.age)||(d[0]==='mutual-fund'&&![1,2].includes(v.mode))||(d[0]==='option-value'&&![1,2].includes(v.kind));output.style.display='block';if(invalid){output.textContent='Please check your inputs. Required periods and rates must be positive.';return;}try{let r=result(d[0],v);let small=document.createElement('small');small.textContent='Estimated result';let strong=document.createElement('strong');strong.textContent=r[0];let note=document.createElement('small');note.textContent=r[1];output.replaceChildren(small,strong,note)}catch(err){output.textContent='Unable to calculate. Please check your inputs.'}});
card.append(heading,desc,form);grid.append(card)});
host.append(index,grid);
if(location.hash)setTimeout(()=>document.getElementById(location.hash.slice(1))?.scrollIntoView(),100);
})();