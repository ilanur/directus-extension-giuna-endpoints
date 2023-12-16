export default (router) => {
    // Endpoint for fetching historical weather data
	// Endpoint per il recupero dei dati meteo storici
	router.get('/historical-weather', async (req, res) => {
		try {
			const { apiKey, location, fromDate, toDate } = req.query;
			const data = await fetchHistoricalWeather(apiKey, location, fromDate, toDate);
			res.json(data);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	});

	// Endpoint per il recupero dei dati storici delle notizie
	router.get('/historical-news', async (req, res) => {
		try {
			const { apiKey, query, fromDate, toDate } = req.query;
			const data = await fetchHistoricalNews(apiKey, query, fromDate, toDate);
			res.json(data);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	});

	// Endpoint predefinito
	router.get('/', (req, res) => res.send('Ciao, Mondo!'));
};

async function fetchHistoricalWeather() {
	
	const weatherApiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${apiKey}&contentType=json&startDateTime=${date}&endDateTime=${date}`;

    try {
        const response = await fetch(weatherApiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const weatherData = await response.json();
        return weatherData;
    } catch (error) {
        console.error('There was a problem with the fetch operation: ', error);
    }
}


async function fetchHistoricalNews(query, startDate, endDate, apiKey) {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&from=${startDate}&to=${endDate}&sortBy=popularity&apiKey=${apiKey}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching historical news data:', error);
        return null;
    }
}

