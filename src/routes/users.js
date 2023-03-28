import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../database/queries.js";

const router = Router();

router.get("/users", async (req, res) => {
  try {
    const data = await getUsers();

    res.json(data);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await getUserById(id);

    res.json(data);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.post("/users", async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    if (firstName) {
      if (email) {
        const data = await createUser(firstName, lastName, email);

        res.status(201).json(data);
      } else {
        res.send("Attribute email is required!");
      }
    } else {
      res.send("Attribute firstName is required!");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { body } = req;
    let attributes = {};

    if (!body.firstName) {
      return res.send("Attribute firstName is required!");
    } else {
      attributes.firstName = body.firstName;
    }

    if (!body.email) {
      return res.send("Attribute email is required!");
    } else {
      attributes.email = body.email;
    }

    attributes = { ...body, ...attributes };
    const data = await updateUser(id, attributes);

    res.json(data);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await deleteUser(id);

    res.json(data);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

export default router;
