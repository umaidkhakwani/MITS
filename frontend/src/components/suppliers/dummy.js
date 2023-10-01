<Grid
  container
  direction="column"
  alignItems="center"
  justifyContent="center"
>
  <Typography
    sx={{
      color: "#593993",
      fontWeight: "bold",
      fontSize: "28px",
      marginTop: "20px",
    }}
  >
    Add Supplier
  </Typography>

  <Grid container spacing={2}>
    <Grid item xs={12} lg={6}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              id="standard-basic-name"
              label="Name"
              variant="standard"
              value={suppliers_create.name}
              onChange={(e) =>
                handle_create_supplier("name", e.target.value)
              }
              required
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              id="standard-basic-email"
              label="Email"
              variant="standard"
              value={suppliers_create.email}
              onChange={(e) =>
                handle_create_supplier("email", e.target.value)
              }
              required
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              id="standard-basic-phone_number"
              label="Phone Number"
              variant="standard"
              value={suppliers_create.phone_number}
              onChange={(e) =>
                handle_create_supplier("phone_number", e.target.value)
              }
              required
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              id="standard-basic-company"
              label="Company"
              variant="standard"
              value={suppliers_create.company}
              onChange={(e) =>
                handle_create_supplier("company", e.target.value)
              }
              required
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              id="standard-basic-category"
              label="Category"
              variant="standard"
              value={suppliers_create.category}
              onChange={(e) =>
                handle_create_supplier("category", e.target.value)
              }
              required
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              id="standard-basic-city"
              label="City"
              variant="standard"
              value={suppliers_create.city}
              onChange={(e) =>
                handle_create_supplier("city", e.target.value)
              }
              required
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              id="standard-basic-address"
              label="Address"
              variant="standard"
              value={suppliers_create.address}
              onChange={(e) => {
                handle_create_supplier("address", e.target.value);
                isFormValid();
              }}
              required
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              id="standard-basic-country"
              label="Country"
              variant="standard"
              value={suppliers_create.country}
              onChange={(e) =>
                handle_create_supplier("country", e.target.value)
              }
              required
              sx={{ width: "100%" }}
            />
          </Grid>
        </Grid>

        {form_validity ? (
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              background: "linear-gradient(45deg, #593993, #9319B5)",
              boxShadow: "0 3px 5px 2px rgba(147, 25, 181, .3)",
              color: "white",
              width: "50%",
              borderRadius: "12px",
            }}
          >
            Create
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              background: "linear-gradient(45deg, #593993, #9319B5)",
              boxShadow: "0 3px 5px 2px rgba(147, 25, 181, .3)",
              color: "white",
              width: "50%",
              borderRadius: "12px",
            }}
            disabled={!form_validity}
          >
            Create
          </Button>
        )}
      </form>
    </Grid>
  </Grid>
</Grid>
