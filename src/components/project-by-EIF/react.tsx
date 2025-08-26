// Change values to suit your needs
const ProjectByEIF = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '0.5rem',
      }}
    >
      <img
        src='/assets/eif-logo.svg'
        alt='Ethereum Identity Foundation'
        width={100}
        height={100}
        style={{
          height: 'auto',
          width: '2rem',
        }}
      />
      <p
        style={{
          textAlign: 'start',
          fontSize: '0.875rem',
          lineHeight: '1.25',
          color: '#9ca3af',
        }}
      >
        A project of the <br />
        <a
          href='https://ethid.org/'
          target='_blank'
          style={{
            color: '#9ca3af',
            textDecoration: 'underline',
            transition: 'color 0.15s ease-in-out',
          }}
        >
          Ethereum Identity Foundation
        </a>
      </p>
    </div>
  )
}

export default ProjectByEIF
