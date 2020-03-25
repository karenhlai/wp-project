
import React from 'react';
// import { InMemoryCache } from 'apollo-cache-inmemory'
// import { createUploadLink } from 'apollo-upload-client'
// import {ApolloClient} from "apollo-client"
import {ApolloProvider, Mutation} from "react-apollo"
import gql from "graphql-tag"
import { UPLOAD_FILE, UPLOAD_FILE_STREAM } from '../../graphql/mutations';

// const apolloCache = new InMemoryCache()

// const uploadLink = createUploadLink({
//   uri: 'http://localhost:4000', // Apollo Server is served from port 4000
//   headers: {
//     "keep-alive": "true"
//   }
// })

// const client = new ApolloClient({
//   cache: apolloCache,
//   link: uploadLink
// })

function UploadFile() {
  return (
    <div className="App">
        <header className="App-header">
            <h2>Save Local</h2>
                <Mutation mutation={UPLOAD_FILE}>
                    {(singleUpload, { data, loading }) => {
                        console.log(data)
                        return (<form onSubmit={() => {console.log("Submitted")}} encType={'multipart/form-data'}>
                                    <input name={'document'} type={'file'} onChange={({target: { files }}) => {
                                        const file = files[0]
                                        file && singleUpload({ variables: { file: file } })
                                    }}/>{loading && <p>Loading.....</p>}</form>)}
                    }
                </Mutation>
            <h2>Stream to Server</h2>
                 <Mutation mutation={UPLOAD_FILE_STREAM}>
                    {(singleUploadStream, { data, loading }) => {
                        console.log(data)
                        return (<form onSubmit={() => {console.log("Submitted")}} encType={'multipart/form-data'}>
                                    <input name={'document'} type={'file'} onChange={({target: { files }}) => {
                                        const file = files[0]
                                        file && singleUploadStream({ variables: { file: file } })
                                    }}/>{loading && <p>Loading.....</p>}</form>)}
                    }
                 </Mutation>
        </header>
    </div>
  );
}

export default UploadFile;