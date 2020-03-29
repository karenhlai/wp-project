
import React from 'react';
import Dropzone from 'react-dropzone'; //allow us to get instance of a file when dropped
import {ApolloProvider, Mutation} from "react-apollo"
import gql from "graphql-tag";
import { UPLOAD_FILE, UPLOAD_FILE_STREAM } from '../../graphql/mutations';

class UploadFile extends React.Component {


  render() {
    return (
      <div>
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
                        return (
                        <form onSubmit={() => {console.log("Submitted")}} encType={'multipart/form-data'}>
                                    <input name={'document'} type={'file'} onChange={({target: { files }}) => {
                                        const file = files[0]
                                        console.log(file)
                                        file && singleUploadStream({ variables: { file: file } })
                                    }}/>{loading && <p>Loading.....</p>}
                          </form>)}
                    }
                 </Mutation>
      </div>
    )
  }
}

export default UploadFile;