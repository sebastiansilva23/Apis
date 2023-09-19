//El evento se dispara al cargarse por completo el DOM.
document.addEventListener("DOMContentLoaded", () => { 
  const form = document.getElementById("pokemon-form");
  const input = document.getElementById("pokemon-name");

  //Agrega un evento de escucha para el envio del formulario.
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = input.value.toLowerCase();
    getPokemonData(searchTerm);
  });

  //Funcion para obtener y mostrar informacion sobre el Pokémonw.
  function getPokemonData(searchTerm) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        //Extrae los datos del Pokémon desde la respuesta JSON.
        let nombre = data.name;
        let height = data.height;
        let weight = data.weight;
        let experiencia = data.base_experience;
        let imagenUrl = data.sprites.front_default;

        let pokemonInfo = document.getElementById("pokemon-info");
        //Crea un elemento DIV para mostrar la informacion del Pokémon.
        let infoElement = document.createElement("div");
        infoElement.innerHTML = "<h2>Nombre del Pokémon: " + nombre + "</h2>";
        infoElement.innerHTML += "<h2>Altura: " + height + " Cm</h2>";
        infoElement.innerHTML += "<h2>Peso: " + weight +  " Kg</h2>";
        infoElement.innerHTML += "<h2>Experiencia: " + experiencia + " XP</h2>";
        
        
        //Crea la imagen y la configura.
        let imagenElement = document.createElement("img");
        imagenElement.src = imagenUrl;
        imagenElement.alt = nombre; 

        //Crea un boton de eliminar.
        let eliminarButton = document.createElement("button");
        eliminarButton.innerText = "Eliminar todo";
        eliminarButton.addEventListener("click", () => {
          pokemonInfo.innerHTML = "";
          input.value = "";
        });

        //Agrega todo al contenedor principal.
        infoElement.appendChild(eliminarButton);
        pokemonInfo.appendChild(imagenElement);
        pokemonInfo.appendChild(infoElement);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error); //El catch captura y maneja los errores.
      });
  }
});

