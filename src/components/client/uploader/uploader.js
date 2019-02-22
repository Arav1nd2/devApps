import React, { Component } from 'react';
import FileUploader from "react-firebase-file-uploader";
import {Button} from 'react-materialize';
import {storage} from '../../../firebase';
import {connect} from 'react-redux';

class Uploader extends Component {
    constructor(props) {
        super(props);
        this.uploaderRef = React.createRef();
        this.uploadEvent = React.createRef();
        this.state = {
            isUploading : false,
            progress : 0,
            url : "",
            file : "",
            upload : false
        }
    }
    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    handleProgress = progress => this.setState({ progress });
    handleUploadError = error => {
      this.setState({ isUploading: false });
      console.error(error);
    };
    handleUploadSuccess = filename => {
      this.setState({ file: filename, progress: 100, isUploading: false });
        storage
        .ref("images")
        .child(filename)
        .getDownloadURL()
        .then(Url => {
            console.log(Url);    
            this.setState({ url : Url })
            this.props.setURL(Url,filename  );
        });

    };
    onSelectedFiles(e) {
        this.uploadEvent = e; 
        e.persist();
        this.setState({
            upload : true
        });
    }
    startUpload() {
        this.uploaderRef.handleFileSelection(this.uploadEvent);
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps !== this.props) {
            console.log('Help me please');  
            if(nextProps.status) {
                this.setState({
                    isUploading : false,
                    progress : 0,
                    url : "",
                    file : "",
                    upload : false
                });
            }
        }
    }

    render() {
        return (
            <div>
                 <label className = "waves-effect waves-light btn">
                    Select the file
                    <FileUploader
                        hidden
                        accept="/*"
                        name="avatar"
                        randomizeFilename
                        storageRef={storage.ref("images")}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                        onProgress={this.handleProgress}
                        onChange={(e) => this.onSelectedFiles(e)}      
                        ref={instance => this.uploaderRef = instance}
                    />
                </label>
                {this.state.url === "" ? <Button floating className = "blue" waves = "light" icon = "cloud_upload" disabled = {!this.state.upload} onClick = {() => this.startUpload()}></Button> :
                <Button floating className = "blue" waves = "light" icon = "cloud_done"/>}
                {this.state.isUploading && <>{this.state.progress}%</>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        status : state.reducer.uploadState
    })
}
export default connect(mapStateToProps)(Uploader);    