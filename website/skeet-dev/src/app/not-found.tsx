export default function NotFound() {
  return (
    <>
      <html lang="en">
        <title>404: This page could not be found.</title>
        <body>
          <div style={styles.error}>
            <div>
              <style
                dangerouslySetInnerHTML={{
                  __html: `body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}`,
                }}
              />
              <h1 className="next-error-h1" style={styles.h1}>
                404
              </h1>
              <div style={styles.desc}>
                <h2 style={styles.h2}>This page could not be found.</h2>
              </div>
            </div>

            <a href="/" style={styles.button}>
              Go back to Home
            </a>
          </div>
        </body>
      </html>
    </>
  )
}

const styles = {
  error: {
    fontFamily:
      'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
    height: '100vh',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  desc: {
    display: 'inline-block',
  },

  h1: {
    display: 'inline-block',
    margin: '0 20px 0 0',
    padding: '0 23px 0 0',
    fontSize: 24,
    fontWeight: 500,
    verticalAlign: 'top',
    lineHeight: '49px',
  },

  h2: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '49px',
    margin: 0,
  },

  button: {
    display: 'inline-block',
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#18181b',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '500',
    borderRadius: '6px',
    textDecoration: 'none',
    transition: 'background-color 0.2s ease',
    cursor: 'pointer',
  },
} as const
