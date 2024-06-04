async function fetchData() {
    const url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b162e81b15mshc1a8ed7c24ee6d7p163124jsn41ad2bc1a5c5',
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            if (response.status === 429) {
                throw new Error('API Rate Limit Exceeded. Please try again later.');
            } else {
                throw new Error('Network response was not ok');
            }
        }
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const result = await response.json();
            console.log(result);
        } else {
            const text = await response.text();
            console.log('Non-JSON response:', text);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
