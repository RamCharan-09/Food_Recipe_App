import axios from 'axios';

const API_URL = 'https://recipe-server-red.vercel.app/api/recipe/'; // Update this to your server's URL if different



export const getRecipes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getRecipeById = (id) => {
  return axios.get(`https://recipe-server-red.vercel.app/api/recipe/${id}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching recipe:', error);
    });
};


export const searchRecipes = async (dishName) => {
  try {
    const response = await axios.get(`${API_URL}/search?q=${dishName}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


// Set up the headers with the token from local storage
const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };
};

export const updateRecipe = (recipeId, recipeData) => {
  const options = {
    method: 'PATCH',
    url: `${API_URL}/${recipeId}`,
    headers: getHeaders(),
    data: recipeData
  };

  return axios.request(options)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Error updating recipe:', error);
      throw error;
    });
};

export const deleteRecipe = (recipeId) => {
  const options = {
    method: 'DELETE',
    url: `${API_URL}/${recipeId}`,
    headers: getHeaders()
  };

  return axios.request(options)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Error deleting recipe:', error);
      throw error;
    });
};



// export const login = async (credentials) => {
//   const options = {
//     method: 'POST',
//     url: `${API_URL}/login`,
//     headers: {
//       accept: 'application/json',
//     },
//     data: credentials,
//   };

//   try {
//     const response = await axios.request(options);
//     return response.data;
//   } catch (err) {
//     console.log(err);
//     return null;
//   }
// };

// // User registration
// export const register = async (userData) => {
//   const options = {
//     method: 'POST',
//     url: `${API_URL}/register`,
//     headers: {
//       accept: 'application/json',
//     },
//     data: userData,
//   };

//   try {
//     const response = await axios.request(options);
//     return response.data;
//   } catch (err) {
//     console.log(err);
//     return null;
//   }
// };
