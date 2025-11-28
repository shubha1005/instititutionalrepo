import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Box,
} from "@mui/material";
import { resourceFields } from "../config/resourceFieldConfig";
import ResourceItemCard from "../components/ResourceItemCard"; // using this!

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const ResourceDetail = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fields = resourceFields[type] || [];

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/resources/${type}/${id}`);
        setResource(res.data.resource || {});
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch resource details.");
      } finally {
        setLoading(false);
      }
    };

    fetchResource();
  }, [type, id]);

  if (loading) {
    return (
      <Container sx={{ mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {type.replace("-", " ").toUpperCase()} Details
      </Typography>

      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 3 }}>
        ← Back
      </Button>

      <Box display="flex" justifyContent="center">
        <ResourceItemCard resource={resource} fields={fields} />
      </Box>
    </Container>
  );
};

export default ResourceDetail;


