import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../SellerPage.css";

function SellerPage() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [shopInfo, setShopInfo] = useState({
        shopName: "",
        category: "",
        logo: null,
    });

    useEffect(() => {
        try {
            const storedShopName = localStorage.getItem("shopName");
            const storedCategory = localStorage.getItem("category");
            const storedLogo = localStorage.getItem("logo");
            const savedItems = JSON.parse(localStorage.getItem("sellerItems")) || [];

            if (storedShopName && storedCategory) {
                setShopInfo({ shopName: storedShopName, category: storedCategory, logo: storedLogo || null });
            } else {
                navigate("/create-shop");
            }

            setItems(savedItems);
        } catch (error) {
            console.error("Error loading data from localStorage:", error);
        }
    }, [navigate]);

    const handleLogoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setShopInfo((prev) => ({ ...prev, logo: reader.result }));
                localStorage.setItem("logo", reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddItem = () => {
        const newItem = { id: Date.now(), name: "", images: [], isFinalized: false };
        setItems((prevItems) => [...prevItems, newItem]);
    };

    const handleFinalizeItem = (id) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, isFinalized: true } : item
            )
        );
    };

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

    const handleItemNameChange = (id, value) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, name: value } : item
            )
        );
    };

    const handleDeleteItem = (id) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const handleNewProduct = (newProduct) => {
        const newItem = {
            id: Date.now(),
            name: newProduct.name,
            images: [URL.createObjectURL(newProduct.image)],
            price: newProduct.price,
            isFinalized: false,
        };
        setItems((prevItems) => [...prevItems, newItem]);
    };

    return (
        <div className="seller-page">
            <header className="shop-header">
                <div className="shop-logo">
                    <div className="logo-container">
                        {shopInfo.logo ? (
                            <img
                                src={shopInfo.logo}
                                alt={`${shopInfo.shopName} Logo`}
                                className="logo-image"
                            />
                        ) : (
                            <div className="placeholder-logo">No Logo Uploaded</div>
                        )}
                        <label htmlFor="logo-upload" className="camera-icon-label">
                            <input
                                type="file"
                                id="logo-upload"
                                accept="image/*"
                                onChange={handleLogoUpload}
                                style={{ display: "none" }}
                            />
                            <i className="fa fa-camera camera-icon" aria-hidden="true"></i>
                        </label>
                    </div>
                </div>
                <div className="shop-info">
                    <h2>{shopInfo.shopName || "Shop Name"}</h2>
                    <p>{shopInfo.category || "Category"}</p>
                </div>
            </header>

            <main className="shop-content">
                <div className="items-grid">
                    {items.map((item) => (
                        <div key={item.id} className="item-card">
                            <input
                                type="text"
                                placeholder="Item Name"
                                value={item.name}
                                onChange={(e) => handleItemNameChange(item.id, e.target.value)}
                                disabled={item.isFinalized}
                            />
                            <input
                                type="file"
                                multiple
                                onChange={(e) => handleItemImageChange(item.id, e.target.files)}
                                disabled={item.isFinalized}
                            />
                            {item.images.length > 0 && (
                                <div className="image-preview">
                                    {item.images.map((img, index) => (
                                        <img key={index} src={img} alt="Item Preview" />
                                    ))}
                                </div>
                            )}
                            {!item.isFinalized && (
                                <button onClick={() => handleFinalizeItem(item.id)}>Finalize</button>
                            )}
                            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
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
