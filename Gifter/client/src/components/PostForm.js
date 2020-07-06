import React, { useContext, useRef } from "react"
import { PostContext } from "../providers/PostProvider"
import { useHistory } from "react-router-dom"

export default props => {
    const { addPost } = useContext(PostContext)

    const history = useHistory();

    const title = useRef("title")
    const imageUrl = useRef("imageUrl")
    const userProfileId = useRef("userProfileId")


    const constructNewPost = () => {
        // create a new post object
        const newPostObj = {
            title: title.current.value,
            imageUrl: imageUrl.current.value,
            dateCreated: new Date(),
            userProfileId: parseInt(userProfileId.current.value)
        }
        console.log(newPostObj)
        // and save it to the API.
        return addPost(newPostObj).then(props.toggler)
    }


    return (
        <form className="PostForm">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="postTitle">Title: </label>
                    <input
                        type="text"
                        id="postTitle"
                        ref={title}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Title"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="imageUrl">Image/GIF: </label>
                    <input
                        type="text"
                        id="imageUrl"
                        ref={imageUrl}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Url to image"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="userProfileId">Assign to a User: </label>
                    <input
                        type="text"
                        id="userProfileId"
                        ref={userProfileId}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="userProfileId goes here"
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={
                    evt => {
                        evt.preventDefault() // Prevent browser from submitting the form
                        constructNewPost().then((p) => history.push("/"));
                    }
                }
                className="btn btn-primary">
                Add Post
            </button>
        </form>
    )
}
