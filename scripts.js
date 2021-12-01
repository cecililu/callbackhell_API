const countriesContainer=document.querySelector('.country-container')

const renderCountry=function(data){
    const html=`
    <article class="">
        <img src='${data.flags['svg']}' style='height:100px'/>
        <div>
        <h3>${data.name.common}</h3>
        <h4>${data.region}</h4>
        <p>${data.population}</p>
        </div>
    </article>`;
 countriesContainer.insertAdjacentHTML('beforeend',html)
}
const getCountryData=function(country){
//making XMLHTTPrequests
const request= new XMLHttpRequest();
request.open("GET",`https://restcountries.com/v3.1/name/${country}`)
request.send();
// console.log('_____> \n\n',request,'hey')
request.addEventListener('load',function(){
   
  const [data]=JSON.parse(this.responseText)
  console.log(data)
  renderCountry(data)
   //get neighbour country
    
   const [neighbour]=data.borders;
   if(!neighbour) return;
   //ajax call 2

            const request2= new XMLHttpRequest();
            request2.open("GET",`https://restcountries.com/v3.1/alpha/${neighbour}`)
            request2.send();
            request2.addEventListener('load',function(){
               //console.log(this.responseText)
               const [dataNeigh]=JSON.parse(this.responseText)
               renderCountry(dataNeigh)
               console.log(dataNeigh)

               //ajax3
               const [neighbour2]=dataNeigh.borders;
           if(!neighbour2) return;
            const request3= new XMLHttpRequest();
            request3.open("GET",`https://restcountries.com/v3.1/alpha/${neighbour2}`)
            request3.send();
                request3.addEventListener('load',function(){
                    
                    const [dataNeigh2]=JSON.parse(this.responseText)
                    renderCountry(dataNeigh2)
                })

            })
  
});
}

getCountryData('nepal')
