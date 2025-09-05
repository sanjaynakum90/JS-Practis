async function fetchCountry() {
    const input = document.getElementById("countryInput").value.trim();
    const card = document.getElementById("countryCard");

    if (!input) {
        card.innerHTML = `<div class="alert alert-warning">Please enter a country name.</div>`;
        return;
    }

    try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${input}`);
        const data = await res.json();

        if (data.status === 404) {
            card.innerHTML = `<div class="alert alert-danger">Country not found.</div>`;
            return;
        }

        const country = data[0];
        const languages = Object.values(country.languages || {}).join(", ");
        const currencies = Object.values(country.currencies || {})
            .map(c => `${c.name} (${c.symbol})`)
            .join(", ");

        card.innerHTML = `
      <div class="card p-3">
        <div class="row g-3">
          <div class="col-md-4 text-center">
            <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" class="flag-img img-fluid" />
          </div>
          <div class="col-md-8">
            <h3>${country.name.common}</h3>
            <p><strong>Capital:</strong> ${country.capital?.[0] || "N/A"}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Languages:</strong> ${languages}</p>
            <p><strong>Currencies:</strong> ${currencies}</p>
            <p><strong>Google Maps:</strong> <a href="${country.maps.googleMaps}" target="_blank">View Location</a></p>
          </div>
        </div>
      </div>
    `;
    } catch (err) {
        card.innerHTML = `<div class="alert alert-danger">Something went wrong. Try again later.</div>`;
        console.error(err);
    }
}