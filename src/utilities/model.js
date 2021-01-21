const database = require("./database");

class Model {
  constructor(name) {
    this.name = name;
  }

  async run(query) {
    //WE ARE GONNA USE THIS EVERYTIME WE SEND A QUERY TO THE DATABASE
    try {
      const response = await database.query(query);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  //GET BY ID METHOD
  async findById(id) {
    if (!id) {
      throw new Error("You did not include an id, you nincompoop");
    }
    if (this.name === "articles") {
      const query = `SELECT 
      articles.id, 
      articles.headline, 
      articles.subhead, 
      articles.content, 
      articles.cover, 
      authors.id AS author_id,
      authors.name AS author_name, 
      authors.lastname AS author_lastname, 
      authors.imgurl AS author_img,
      categories.id AS category_id,
      categories.name AS category,
      categories.imgurl AS category_img
      FROM articles
      INNER JOIN authors ON articles.authorid=authors.id
      INNER JOIN categories ON articles.categoryid=categories.id
       WHERE articles.id=${parseInt(id)}`;
      const response = await this.run(query);
      return response.rows;
    } else {
      const query = `SELECT * FROM ${this.name} WHERE id=${parseInt(id)}`;
      const response = await this.run(query);
      return response.rows;
    }
  }

  //PUT METHOD
  async findByIdAndUpdate(id, body) {
    if (!id) {
      throw new Error("You did not include an id, you nincompoop");
    }
    const entries = Object.entries(body);
    const query = `UPDATE ${this.name} SET ${entries.map(
      (entry) => `${entry[0]}='${entry[1]}'`
    )}  WHERE id=${parseInt(id)}`;
    const response = await this.run(query);
    return response;
  }

  //POST METHOD
  async save(body) {
    if (!body || Object.values(body).length === 0) {
      throw new Error("Oi! Give us a body, you scallywag!");
    }
    const entries = Object.entries(body);
    const query = `INSERT INTO ${this.name} (${entries.map(
      (entry) => entry[0]
    )}) VALUES(${entries.map((entry) => `'${entry[1]}'`)})`;
    const response = await this.run(query);
    return response;
  }

  //DELETE METHOD
  async findByIdAndDelete(id) {
    if (!id) {
      throw new Error("You did not include an id, you nincompoop");
    }
    const query = `DELETE FROM ${this.name} WHERE id=${parseInt(id)}`;
    const response = await this.run(query);
    return response;
  }

  //GET ALL METHOD
  async findOne(search) {
    if (
      !search ||
      (Object.values(search).length === 0 && this.name !== "articles")
    ) {
      //BASIC GET ALL
      console.log("1");
      const query = `SELECT * FROM ${this.name}`;
      const response = await this.run(query);
      return response.rows;
    } else if (!search.query && this.name !== "articles") {
      console.log("2");
      const entries = Object.entries(search);
      const query = `SELECT * FROM ${this.name} WHERE ${entries
        .map((entry) => `${entry[0]}='${entry[1]}'`)
        .join(" AND ")}`;
      const response = await this.run(query);
      return response.rows;
    } else if (Object.values(search).length >= 1 && !search.query) {
      console.log("3");
      const entries = Object.entries(search);
      const query = `SELECT 
      articles.id, 
      articles.headline, 
      articles.subhead, 
      articles.content, 
      articles.cover, 
      authors.id AS authorid,
      authors.name AS author_name, 
      authors.lastname AS author_lastname, 
      authors.imgurl AS author_img,
      categories.name AS category,
      categories.imgurl AS category_img
      FROM articles
      INNER JOIN authors ON articles.authorid=authors.id
      INNER JOIN categories ON articles.categoryid=categories.id
      WHERE ${entries.map((entry) => `${entry[0]}='${entry[1]}'`).join(" AND ")}
      `;
      const response = await this.run(query);
      return response.rows;
    } else if (Object.values(search).length >= 1 && search.query) {
      console.log("4");
      const query = `SELECT 
      articles.id, 
      articles.headline, 
      articles.subhead, 
      articles.content, 
      articles.cover, 
      authors.id AS authorid,
      authors.name AS author_name, 
      authors.lastname AS author_lastname, 
      authors.imgurl AS author_img,
      categories.name AS category,
      categories.imgurl AS category_img
      FROM articles
      INNER JOIN authors ON articles.authorid=authors.id
      INNER JOIN categories ON articles.categoryid=categories.id
      WHERE LOWER(articles.headline) LIKE LOWER('%${search.query}%') 
      OR LOWER(articles.content) LIKE LOWER('%${search.query}%')
      `;
      const response = await this.run(query);
      return response.rows;
    } else {
      const query = `SELECT 
      articles.id, 
      articles.headline, 
      articles.subhead, 
      articles.content, 
      articles.cover, 
      authors.id AS authorid,
      authors.name AS author_name, 
      authors.lastname AS author_lastname, 
      authors.imgurl AS author_img,
      categories.name AS category,
      categories.imgurl AS category_img
      FROM articles
      INNER JOIN authors ON articles.authorid=authors.id
      INNER JOIN categories ON articles.categoryid=categories.id
      
      `;
      const response = await this.run(query);
      return response.rows;
    }
  }

  //COUNT CATEGORIES
  async countCategories() {
    const query = `SELECT
    categories.id,
    categories.name,
    COUNT(articles.categoryid) AS total_articles
    FROM categories
    INNER JOIN articles ON categories.id=articles.categoryid
    GROUP BY (categories.id)`;
    const response = await this.run(query);
    return response.row;
  }
}

module.exports = Model;
