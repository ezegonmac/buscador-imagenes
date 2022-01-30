import { useState } from "react"
import { Formik, Form, Field } from "formik"
import "./header.css"
import "./content.css"
import "./article.css"

const App = () => {

  const open = (url) => window.open(url)
  const [photos, setPhotos] = useState([])

  return (
    <div>
      <header>
        <Formik 
          initialValues={{ search: "" }}
          onSubmit={async values => {
            const response = await fetch(
                `https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, 
                {
                  headers: {
                    "Authorization" : "Client-ID TU14T30itkPwm88I0WPGJjN7362oXzK7aZZK_fhIUxU"
                  }
                })
            const data = await response.json()
            setPhotos(data.results)
          }}>
            <Form>
              <Field name="search"/>
            </Form>

        </Formik>
      </header>

      <div className="container">
        <div className="center">
          {photos.map(photo => 
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.regular}/>
              <p>{[photo.description, photo.alt_description].join(" - ")}</p>
            </article>)}
        </div>
      </div>
    </div>
  )
}

export default App;
