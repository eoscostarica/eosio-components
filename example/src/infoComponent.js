import React from 'react'

const Info = ({ componentName, properties, hasChildren }) => (
  <div className='exampleComponent'>
    <h3>Example</h3>
    <p className={'componentName'}>{componentName}</p>
    <div className='propertiesBoxDescription'>
      <pre>
        <span className='tagnamecolor'>
          <span className='tagcolor'>{'<'}</span>
          {`${componentName} `}
          {properties.map(({ label, value }, index) => (
            <span className='attributecolor' key={`tag-${label}-${index}`}>
              {index === 0 && <br />}
              {` ${label}`}
              <span className='attributevaluecolor'>{value}</span>
              <br />
            </span>
          ))}
          <span className='tagcolor'>{hasChildren ? '>' : '/>'}</span>
          {hasChildren && <br />}
        </span>

        {hasChildren && (
          <>
            {'/***************'}<br />
            {'YOUR CODE HERE'}<br />
            {'***************/'}<br />
            <span className='tagnamecolor'>
              <span className='tagcolor'>{`</`}</span>
              {componentName}
              <span className='tagcolor'>{`>`}</span>
            </span>
          </>
        )}
      </pre>
    </div>
  </div>
)

export default Info
