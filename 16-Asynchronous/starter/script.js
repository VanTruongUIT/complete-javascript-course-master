'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const rootEndpoint = 'https://restcountries.com/v2';
const portugalEndpoint = `${rootEndpoint}/name/portugal`;
// console.log('portugalEndpoint: ', portugalEndpoint);
const publicAPIGithub = 'https://github.com/public-apis/public-apis';


const renderCountry = function(data, className='') {
    const htmlCountries = `
    <article class="country" ${className}>
        <img class="country__img" src=${data['flag']} />
        <div class="country__data">
        <h3 class="country__name">${data['name']}</h3>
        <h4 class="country__region">${data['region']}</h4>
        <p class="country__row"><span>👫</span>${data['population']}</p>
        <p class="country__row"><span>🗣️</span>${data['languages'][0]['name']}</p>
        <p class="country__row"><span>💰</span>${data['currencies'][0]['name']}</p>
        </div>
    </article>
    `;
    console.log('htmlCountries: ', htmlCountries);
    countriesContainer.insertAdjacentHTML(
        'beforeend',
        htmlCountries
    );
    countriesContainer.style.opacity = 1;
}

const renderError = (errorMsg) => {
    countriesContainer.insertAdjacentText('beforeend', errorMsg);
    countriesContainer.style.opacity = 1;
};


// const getCountryAndNeighbour = function(countryName) {
//     // Create a new request
//     // AJAX call country 1
//     const request = new XMLHttpRequest();
//     // open a new get request with endpoint
//     request.open(
//         'GET',
//         `${rootEndpoint}/name/${countryName}`
//     );
//     // we can not assign request.send() to a variable. Because it's a asynchronous code, it runs in the background, it was taked time to send and response data.
//     request.send();
//     // so we need register a callback function to a load event to process data immediately after we get the data from server
//     request.addEventListener('load', () => {
//         // we will use the this -> this of request context
//         const [data] = JSON.parse(request.responseText);
//         console.log('data: ', data);

//         // Render country 1
//         renderCountry(data);


//         // Get neighbour country (2)
//         const neighbour = data?.borders?.[0];
//         if (!neighbour) {
//             return;
//         }
//         // AJAX call country 2
//         console.log('neighbour: ', neighbour);
//         const request2 = new XMLHttpRequest();
//         // open a new get request with endpoint
//         request2.open(
//             'GET',
//             `${rootEndpoint}/alpha/${neighbour}`
//         );
//         // we can not assign request2.send() to a variable. Because it's a asynchronous code, it runs in the background, it was taked time to send and response data.
//         request2.send();

//         request2.addEventListener('load', () => {
//             const neighbourData = JSON.parse(request2.responseText);
//             console.log('Request two times for - neighbourData: ', neighbourData);

//             renderCountry(neighbourData);
//         });

//     });
// };

// getCountryAndNeighbour('portugal');
// getCountryAndNeighbour('usa');
// getCountryAndNeighbour('vietnam');

// const timeToLive = 0;

// ################################# CALLBACK HELL #################################
/* Asynchronous code is not block the current execution engineer
    Go to the next code
    But sometimes, we want to wait some action until the background task fisnishes 
    Now, We need implement the another callback inside the first callback function.
    for more information, please visit at: https://anhtruong.it.com/
*/
// CALLBACK HELL
// setTimeout(() => {
//     console.log('Log setTimeOut at: ', 1);
//     setTimeout(() => {
//         console.log('Log setTimeOut at: ', 2);
//         setTimeout(() => {
//             console.log('Log setTimeOut at: ', 3);
//             setTimeout(() => {
//                 console.log('Log setTimeOut at: ', 4);
                
//             }, 1000);            
//         }, 1000);        
//     }, 1000);    
// }, 1000);


/* 
################################## PROMISE ################################## 
*/

// const getJSON = (url, errorMsg='Something went wrong') => {
//     return fetch(url)
//         .then(response => {
//             console.log('response: ', response);
//             if (!response.ok) {
//                 throw new Error(`${errorMsg} ${response?.status}`);
//             }
//             return response.json();            
//         })
// }

// const getCountryData = (countryName) => {

//     return getJSON(
//         `${rootEndpoint}/name/${countryName}`,
//         'Country not found'
//     )
//         .then(data => {
//             renderCountry(data[0])
//             const neighbour = data?.[0].borders?.[0];
//             console.log('neighbour: ', neighbour);

//             if (!neighbour) {
//                 throw new Error(`No neighbour can be found!`);
//             }
//             return getJSON(
//                 `${rootEndpoint}/alpha/${neighbour}`,
//                 'Country not found'
//             )            
//         })
//         .then(data => renderCountry(data, 'neighbour'))
//         .catch(error => {
//             console.error(`${error} 🎇🎇🎇`);
//             renderError(`Something went wrong!!! 🎇🎇🎇 ${error.message}. Try again!`)
//         })
//         .finally(() => {
//             countriesContainer.style.opacity = 1;
//         })
// }

// const rootGeoEnpoint = 'https://geocode.xyz';
// const geoApiKey = '786858046131348759256x94117';

// const getGeocode = (lat='52.803', lng='13.381') => {
//     return fetch(
//         `${rootGeoEnpoint}/${lat},${lng}?geoit=json&auth=${geoApiKey}`,
//         error => {
//             console.log('Something went wrong: ', error);
//             throw new Error(`Something went wrong${error}`)
//         }
//     )
//         .then(response => {
//             console.log('response: ', response);

//             if (!response.ok) {
//                 throw new Error(`Message: ${response.message}! Status code: ${response.status}`)
//             }
//             return response.json()
//         })
//         .then(data => {
//             console.log('data: ', data);
//             const countryName = data.country
//             console.log('countryName at getGeocode: ', countryName);
//             // return getCountryName(countryName);
//             return fetch(
//                 `${rootEndpoint}/name/${countryName}`,
//             );
//         })
//         .then(response => {
//             console.log('response: ', response);
//             if (!response.ok) {
//                 throw new Error(`${errorMsg} ${response?.status}`);
//             }
//             return response.json();            
//         })
//         .then(data => {
//             renderCountry(data[0])
//         })
// }

// getGeocode();
// getGeocode(19.037, 72.873);
// getGeocode(-33.933, 18.474);;


// const getCountryName = async (lat='52.803', lng='13.381') => {
//     try {
//         const response = await fetch(
//             `${rootGeoEnpoint}/${lat},${lng}?geoit=json&auth=${geoApiKey}`,
//         )
//         try {
//             return await response.json();
//         } catch (error) {
//             console.log(error);
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

// const displayCountry = async () => {
//     const country = await getCountryName();
//     console.log(country.country);
//     return country.country;
// }
// console.log(displayCountry());


// console.log('Test starts!');

// setTimeout(() => {
//     console.log('Wait only 0 second timer!');
// }, 0);

// Promise.resolve('Resolved promise 1')
//     .then(res => console.log(res))

// console.log('Test ends!')

/* 

1. Test starts!
2. Test ends!
3. Resolved promise 1
4. Wait only 0 second timer!
*/

// const lotteryPromise = new Promise((resolve, reject) => {
//     console.log('Lotter draw is happening!');
//     const value = Math.random();
//     console.log("value: ", value);
//     if (value >= 0.5) {
//         resolve("You're WIN 🤩");
//     }
//     reject(new Error("You're lose 😫"));
// });

// lotteryPromise
//     .then(res => console.log(res))
//     .catch(err => console.error(err))



// const wait = (seconds) => {
//     return new Promise(resolve => {
//         setTimeout(resolve, seconds * 1000);
//     })
// }

// wait(1)
//     .then(res => {
//         console.log(`Waited 1 seconds`);
//         return wait(2);
//     })
//     .then(res => {
//         console.log(`Waited 2 seconds`);
//         return wait(3);
//     })
//     .then(res => {
//         console.log(`Waited 3 seconds`);
//         return wait(4);
//     })
//     .then(res => {
//         console.log(`Waited 4 seconds`);
//     })


// Promise.resolve('aaa').then(res => console.log(res));
// Promise.reject(new Error('issue')).catch(error => console.error(error));


// navigator.geolocation.getCurrentPosition(
//     position => {
//        console.log(position) 
//     },
//     error => {
//         console.error(error)
//     }
// )
// console.log('Getting position');

// const getPosition = () => {
//     return new Promise((resolve, reject) => {
//         // navigator.geolocation.getCurrentPosition(
//         //     position => resolve(position),
//         //     error => reject(error)
//         // )
//         navigator.geolocation.getCurrentPosition(resolve, reject)
//     })
// }

// getPosition()
//     .then(pos => {
//         console.log(pos)
        
//     })

// const whereAmI = () => {
//     getPosition()
//         .then(pos => {
//             console.log('position: ', pos);

//             const {latitude: lat, longitude: lng} = pos.coords;
//             console.log(lng)
//             console.log(lat)
//             return fetch(
//                 `${rootGeoEnpoint}/${lat},${lng}?geoit=json&auth=${geoApiKey}`,
//                 error => {
//                     console.log('Something went wrong: ', error);
//                     throw new Error(`Something went wrong${error}`)
//                 }
//             )
//         })
//         .then(response => {
//             console.log('response: ', response);

//             if (!response.ok) {
//                 throw new Error(`Message: ${response.message}! Status code: ${response.status}`)
//             }
//             return response.json()
//         })
//         .then(data => {
//             console.log('data: ', data);
//             const countryName = data.country
//             console.log('countryName at getGeocode: ', countryName);
//             // return getCountryName(countryName);
//             return fetch(
//                 `${rootEndpoint}/name/${countryName}`,
//             );
//         })
//         .then(response => {
//             console.log('response: ', response);
//             if (!response.ok) {
//                 throw new Error(`Country is not founded ${response?.status}`);
//             }
//             return response.json();            
//         })
//         .then(data => {
//             renderCountry(data[0])
//         })
// }


// btn.addEventListener('click', whereAmI)




/* 
/////////////////////////////////////////
// Coding Challenge #2

Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some sturff on your own. Pretend you're woking on your own.

PART 1.
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image paht. when the image is done loding, append it to the DOM element with the 'images' class, and resolve the promise. The fullilled value should be the image element itself. In case there is an error loding the image ('error' event), reject the promise.

If this part too tricky for you, just watch the first part of the solution.


PART 2.
1. Consume the promise using .then and also add an error handler;
2. After the image loaded, pause execution for 2 seconds using the wait function we created earlier;
3. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promsie to hide the current image. You will need a global variable for that);
4. After the second image has loaded, pause execution for 2 seconds again;
5. After the 2 seconds have passed, hide the current image

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the nework speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK!!!
*/
// let currentImg;
// const imageContainer = document.querySelector('.images');

// const wait = (seconds) => {
//     return new Promise(resolve => {
//         setTimeout(resolve, seconds * 1000);
//     })
// };
// const createImage = (imgPath) => {
//     return new Promise((resolve, reject) => {
//         /* All the asynchronous code in the callback function here.
//         resolve, reject are the function js, It will consume the value come from promise with .then or .catch value */
//             const image = document.createElement('img');
//             image.src = imgPath;
            
//             image.addEventListener('load', () => {
//                 imageContainer.append(image);
//                 resolve(image);
//             });

//             image.addEventListener('error', (error) => {
//                 reject(new Error(error));
//             });

//         }
//     );
// };

// createImage("./img/img-1.jpg")
//     .then(img => {
//         console.log(`Image 1 is loaded`);
//         currentImg = img;
//         return wait(4);
//     })
//     .then(() => {
//         currentImg.style.display = 'none';
//         return createImage('./img/img-2.jpg');
//     })
//     .then(img => {
//         currentImg = img;
//         console.log(`Image 2 is loaded`);
//         return wait(4);
//     })
//     .then(() => {
//         currentImg.style.display = 'none';
//     })
//     .catch(error => {
//         console.error(error)
//     })

// const getPosition = () => {
//     return new Promise((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(resolve, reject)
//     })
// }

// const rootGeoEnpoint = 'https://geocode.xyz';
// const geoApiKey = '786858046131348759256x94117';
// const countryRootEndpoint = 'https://restcountries.com/v2';

// const whereAmI = async () => {
//     // Get geo location
//     try {
//         const position = await getPosition();
//         const {latitude: lat, longitude: lng} = position.coords;

//         // reverse geocoding
//         const resGeo = await fetch(`${rootGeoEnpoint}/${lat},${lng}?geoit=json&auth=${geoApiKey}`);
//         if (!resGeo.ok) {
//             errorMsg = `Something wrong when getting geo!`;
//             console.log(new Error(errorMsg));
//             throw new Error(errorMsg)
//         }
//         const dataGeo = await resGeo.json();
//         console.log(dataGeo);

//         // country data
//         const countryName = dataGeo.country || 'vietnam';
//         const res = await fetch(`${countryRootEndpoint}/name/${countryName}`);
//         if (!res.ok) {
//             errorMsg = `Something wrong when getting country!`;
//             console.log(new Error(errorMsg));
//             throw new Error(errorMsg)            
//         }
//         const data = await res.json();

//         console.log(data);

//         renderCountry(data[0]);

//         return `We are in ${dataGeo.city}`;
//     } catch (error) {
//         console.error(new Error(error));
//         renderError(`${error.message}`)
//     }
// };


// console.log('1. Starting get location');
// (
//     async () => {
//         const data = await whereAmI();
//         console.log(data);
//     }
// )()
// console.log('2. Finishing get location');


/* ///////////////////////////////////////// promise.allL
 */
// const countryRootEndpoint = 'https://restcountries.com/v2';

// const getJSON = (url, errorMsg='Something went wrong') => {
//     return fetch(url)
//         .then(response => {
//             console.log('response: ', response);
//             if (!response.ok) {
//                 throw new Error(`${errorMsg} ${response?.status}`);
//             }
//             return response.json();            
//         })
// }

// const get3Countries = async(c1, c2, c3) => {
//     try {
//         /* Promise.all -> Return a new promise: that runs all of the promises at the same time.
//            Once we have one promise was rejected then -> the whole promises actually rejects as well    
//         */
//         const data3= await Promise.all([
//             getJSON(`${countryRootEndpoint}/name/${c1}`),
//             getJSON(`${countryRootEndpoint}/name/${c2}`),
//             getJSON(`${countryRootEndpoint}/name/${c3}`),
//         ]);
//         console.log(data3.map(data => (data[0].capital)));
//     } catch (error) {
//         console.error(new Error(error));
//         throw new Error(error);
//     }
// }

// get3Countries('portugal', 'vietnam', 'canada');


/* ///////////////////////////////////////// promise.race
 */

// const timeout = async (seconds) => {
//     return new Promise((_, reject) => {
//         setTimeout(() => {
//             reject(new Error('Request take too long time!!!'))
//         }, seconds * 1000);
//     })
// }

// const getJSON = (url, errorMsg='Something went wrong') => {
//     return fetch(url)
//         .then(response => {
//             console.log('response: ', response);
//             if (!response.ok) {
//                 throw new Error(`${errorMsg} ${response?.status}`);
//             }
//             return response.json();            
//         })
// }
// const countryRootEndpoint = 'https://restcountries.com/v2';
// (
//     async () => {
//         const res = await Promise.race([
//             getJSON(`${countryRootEndpoint}/name/vietnam`),
//             getJSON(`${countryRootEndpoint}/name/italy`),
//             getJSON(`${countryRootEndpoint}/name/mexico`),
//         ]);

//         console.log(res[0]);
//     }
// )()

// Promise.race([
//     getJSON(`${countryRootEndpoint}/name/vietnam`,
//     timeout(1)
// ])
//     .then(res => console.log(res[0]))
//     .catch(error => console.log(error))



/* /////////////////////////////////// CODING CHALLENGE 3 
*/


// const wait = (seconds) => {
//     return new Promise((resolve) => {
//         setTimeout(resolve, seconds * 1000);
//     })
// }

// const imgContainer = document.querySelector('.images');

// const createImage = (imgPath) => {
//     return new Promise((resolve, reject) => {
//         const img = document.createElement('img');
//         img.src = imgPath;

//         img.addEventListener('load', () => {
//             imgContainer.append(img);
//             resolve(img);
//         })
//         img.addEventListener('error', () => {
//             reject(new Error('Image not found'));
//         })
//     })
// }



// // let currentImage;
// const loadNPause = async () => {
//     try {
//         let image = await createImage('./img/img-1.jpg');
//         console.log('Image 1 loaded');
//         await wait(4);
//         image.style.display = 'none';

//         image = await createImage('./img/img-2.jpg');
//         console.log('Image 2 loaded');
//         await wait(4);
//         image.style.display = 'none';
        
//     } catch (error) {
//         console.error(error)
//     }
// }

// // loadNPause();

// const loadAll = async (imgPaths) => {
//     try {
//         const imgs = imgPaths.map(async (img) => {
//             return await createImage(img)
//         });
//         // list of promises
//         console.log('imgs', imgs);
//         const imgsEl = await Promise.all(imgs);
//         console.log(imgsEl);
//         imgsEl.forEach(img => img.classList.add('parallel'));
//     } catch (error) {
        
//     }
// }
// loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);



/* 
######################################### DEEP DIVE INTO ASYNCHRONOUS
*/

function first() {
    console.log(1)
}
function second() {
    setTimeout(() => {
        console.log(2)
    }, 0);
}
function third() {
    console.log(3)
}

// first();
// second();
// third();


function asynchronousRequest(args, callback) {
    // Throw an error if no arguments are passed
    if (!args) {
        console.log(new Error('Something went wrong! Maybe, no args was passed'));
        return;
    }
    return setTimeout(() => {
        callback(null, {body: args + ' ' + Math.floor(Math.random() * 10)})
    }, 500);
}

function callbackHell() {
    asynchronousRequest(
        'First',
        function first(error, response) {
            if (error) {
                console.error(error);
                return;
            }
            console.log(response.body);
            asynchronousRequest(
                'Second',
                function second(error, response) {
                    if (error) {
                        console.error(error);
                        return;
                    }
                    console.log(response.body);
                    asynchronousRequest(
                        null,
                        function third(error, response) {
                            if (error) {
                                console.error(error);
                                return;
                            }
                            console.log(response.body);                            
                        }
                    )
                }
            )
        }
    )
};

// callbackHell();

/* 
############################## PROMISES
A promise represents the completion of an asynchronous functions. It is an object that might return a value in the future.

    promise:
        status:
            + pending: initial state before being resolved or rejected
            + fulfilled: successful operation
            + rejected: failed operation
        value:
            this is the parameter take as a input in the resolve or reject function

        After the promise status is fulfilled or rejected -> a promise is setlled (đã giải quyết xong)
        
*/
// Create a new promise
// const promise = new Promise((resolve, reject) => {
//     resolve('Value from promise');
//     // resolve('failed');
// });

// How to consume a promise -> That means we have the value after asynchronous code
// promise.then(response => console.log(response))

// const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('Resolving an asynchronous request!')
//     }, 2000);
// });
// // promise.then(res => console.log(res))

// // promise 
// //     .then(firstRes => firstRes + ' and chaining')
// //     .then(secondRes => console.log(secondRes))

// promise
//     .then((first) => {
//         const x = first;
//         console.log(x);
//         return x + ' and chaining'
//     })
//     .then(second => console.log(second))


/* Error handling */
// function getUsers(onSuccess) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (onSuccess) {
//                 resolve([
//                     {id: 1, name: 'Truong'},
//                     {id: 2, name: 'Anh'},
//                     {id: 3, name: 'Tran'},
//                 ]);
//             } else {
//                 reject('Failed to call API');
//             }
//         }, 1000);
//     })
// };


// console.log('start handling getUsers data');

// getUsers(true)
//     .then(res => console.log(res))
//     .catch(err => console.error(err))


/* Using fetch API with Promises */
// fetch('https://api.github.com/users/octocat')
//     .then(res => res.json())
//     .then(data => console.log(data))
//     .catch(err => console.error(err))



/* Async Function with async/await */
// async function allways return a promise instead of a value
async function getUsers() {
    try {
        const res = await fetch('https://api.github.com/users/octocat');
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.error(error)
    }
}
// console.log(getUsers().then(res => console.log(res)))
getUsers()