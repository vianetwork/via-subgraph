# L2 indexer for via network
The indexer indexes the L2BaseTOken events and stores them in a PostgresDB. The data can be accessed using the **Graphql UI**. 

## Dev

1. Update the ENVs in the `.example.env` file.
2. Run `Make up` tp start the services.
3. Access the data using the graphql [UI](http://localhost:8000/subgraphs/name/via-graph/graphql)
4. Run `make down` to clean the containers