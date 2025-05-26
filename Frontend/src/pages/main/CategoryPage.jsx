import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cards from "../../components/main/Cards";
import Navbar from "../../components/main/Navbar";

function CategoryPage() {
    const { categoryName } = useParams();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await axios.get(`http://localhost:4001/book?category=${categoryName}`);
                setBooks(res.data);
            } catch (error) {
                console.error("Error fetching category books:", error);
            }
        };

        fetchBooks();
    }, [categoryName]);

    return (
        <>
            <Navbar />
            <div className="max-w-screen-2xl container md:px-20 px-4 bg-white mt-[100px]">
                <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center capitalize">
                    {categoryName.replace(/-/g, " ")} Books
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {books.map((book) => (
                        <Cards key={book.id} item={book} />
                    ))}
                </div>

            </div>
        </>
    );
}

export default CategoryPage;
