"use client";

import { CategoryService } from "@/app/(client)/services/categoryService";
import { Skeleton } from "@nextui-org/react";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { toast } from "react-toastify";

export default class TopCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchTopCategories();
  }

  async fetchTopCategories() {
    try {
      this.setState({ loading: true });
      const response = await CategoryService.getTopCategory();
      if (response.ok) {
        this.setState({ categories: response.data, loading: false });
      } else {
        toast.error("Failed to fetch categories");
        this.setState({ loading: false });
      }
    } catch (error) {
      toast.error("An error occurred while fetching categories");
      console.error("Error details:", error);
      this.setState({ loading: false });
    }
  }

  render() {
    const { categories, loading } = this.state;

    return (
      <div className="my-3">
        <h2>Top Categories</h2>
        <div className="flex gap-4 my-5">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="rounded-lg w-1/4 h-24">
                <div className="h-full rounded-lg bg-default-300"></div>
              </Skeleton>
            ))
            : categories.length > 0
              ? categories.map((category) => (
                <div
                  key={category.id}
                  className="p-3 w-1/4 rounded-md border border-gray-400"
                  style={{ background: category.color || "#e0e0e0" }}
                >
                  <p className="text-gray-800 text-lg">{category.title}</p>
                  <span className="text-gray-700 text-sm">hello this is testing</span>
                </div>
              ))
              : <p>No categories available.</p>}
        </div>
      </div>
    );
  }
}

TopCategories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      color: PropTypes.string, // Validate color as optional string
    })
  ),
};
