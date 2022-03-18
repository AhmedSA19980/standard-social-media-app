



//* display the latest search result // dsiplay the latest search text or users profiles or cases


 const  SearchHistory =({onClickToDeleteSearchHistort, searchText})=>{
    return(
        <div>
            <div>
                <span>{searchText}</span>
                <span onClick={onClickToDeleteSearchHistort}>
                    delete
                </span>
            </div>
        </div>
    )
}


export default SearchHistory