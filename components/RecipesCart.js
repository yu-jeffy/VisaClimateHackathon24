import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import styles from '../styles/RecipesCart.module.css';

const RecipesCart = ({ isVisible }) => {
  const { cart } = useCart();
  const [recipes, setRecipes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecipes = async (cartContents) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/get-recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Here are the items in my cart: ${JSON.stringify(cartContents)}. Suggest and briefly explain a single recipe I can make with these items. Then make a small list in a sentence of other possible recipes. Keep your response to one paragraph.`,
        }),
      });

      const data = await response.json();
      console.log('Fetched recipes:', data.recipes); // Log fetched recipes
      setRecipes(data.recipes || ""); // Ensure recipes is always a string
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setError('Failed to fetch recipes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isVisible && cart.length > 0) {
      fetchRecipes(cart);
    }
  }, [isVisible, cart]);

  return (
    <div className={styles.container}>
      {loading && <p>Loading recipes...</p>}
      {error && <p>{error}</p>}
      {recipes !== "" ? (
        <div className={styles.recipesList}>
          {recipes.split('\n').map((recipe, index) => (
            <div key={index} className={styles.recipeCard}>
              <p>{recipe}</p>
            </div>
          ))}
        </div>
      ) : (
        !loading && !error && <p>No recipes found</p>
      )}
    </div>
  );
};

export default RecipesCart;
