# L2 indexer for via network
The indexer indexes the L2BaseTOken events and stores them in a PostgresDB. The data can be accessed using the **Graphql UI**. 

## Running the Bridge Graph

1.  **Start Docker:**
    ```bash
    make up
    ```

2.  **Install Dependencies:**
    ```bash
    make install-all
    ```

3.  **Generate & Build:**
    ```bash
    make codegen-all
    make build-all
    ```

4.  **Create Subgraphs (First time only):**
    ```bash
    make create-local-l1
    make create-local-l2
    ```

5.  **Deploy Subgraphs:**
    ```bash
    make deploy-all-local
    ```

**One-liner for updates (after first setup):**
```bash
make codegen-all && make build-all && make deploy-all-local
```

## Accessing Data
Access the data using the graphql [UI](http://localhost:8000/subgraphs/name/via-graph/graphql)

## Cleanup
Run `make down` to clean the containers