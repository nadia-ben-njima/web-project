import React, { useState } from "react";
import "/Users/bennjimanadia/mon-ecommerce/src/SellerPage.css";

function SellerPage({ shopDetails }) {
  const [items, setItems] = useState([]);

  // Handle adding new items
  const handleAddItem = () => {
    const newItem = { id: Date.now(), name: "", images: [], isFinalized: false };
    setItems([...items, newItem]);
  };

  // Finalize item (prevents edits)
  const handleFinalizeItem = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isFinalized: true } : item
      )
    );
  };

  // Handle image uploads
  const handleItemImageChange = (id, files) => {
    const imagePreviews = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        imagePreviews.push(reader.result);
        if (imagePreviews.length === files.length) {
          setItems((prevItems) =>
            prevItems.map((item) =>
              item.id === id ? { ...item, images: imagePreviews } : item
            )
          );
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Handle item name
  const handleItemNameChange = (id, value) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, name: value } : item
      )
    );
  };

  // Delete item
  const handleDeleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="seller-page">
      <header className="shop-header">
        <div className="shop-logo">
          {shopDetails.logo ? (
            <img src={shopDetails.logo} alt="Shop Logo" />
          ) : (
            <div className="placeholder-logo">No Logo Uploaded</div>
          )}
        </div>
        <div className="shop-info">
          <h2>{shopDetails.shopName || "Shop Name"}</h2>
          <p>{shopDetails.category || "Category"}</p>
        </div>
      </header>

      <main className="shop-content">
        <div className="items-grid">
          {items.map((item) => (
            <div key={item.id} className="item-card">
              {item.images.length ? (
                <div className="image-preview">
                  {item.images.map((img, index) => (
                    <img key={index} src={img} alt={`Preview ${index + 1}`} />
                  ))}
                </div>
              ) : (
                !item.isFinalized && (
                  <label
                    htmlFor={`itemImageUpload-${item.id}`}
                    className="image-upload-label"
                  >
                    <input
                      type="file"
                      onChange={(e) =>
                        handleItemImageChange(item.id, e.target.files)
                      }
                      id={`itemImageUpload-${item.id}`}
                      style={{ display: "none" }}
                    />
                    <div className="placeholder-item">Add Image</div>
                  </label>
                )
              )}

              <div className="item-details">
                {item.isFinalized ? (
                  <p className="finalized-name">{item.name}</p>
                ) : (
                  <input
                    type="text"
                    placeholder="Item Name"
                    value={item.name}
                    onChange={(e) =>
                      handleItemNameChange(item.id, e.target.value)
                    }
                    className="item-name-input"
                  />
                )}
              </div>

              <div className="item-actions">
                {!item.isFinalized ? (
                  <button
                    className="finalize-button"
                    onClick={() => handleFinalizeItem(item.id)}
                  >
                    Finalize
                  </button>
                ) : (
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
          <button className="add-item-button" onClick={handleAddItem}>
            + Add Item
          </button>
        </div>
      </main>
    </div>
  );
}

export default SellerPage;
