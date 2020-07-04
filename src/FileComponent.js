import React from 'react'
import { styled, withTheme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import DeleteIcon from '@material-ui/icons/Delete'
import DescriptionIcon from '@material-ui/icons/Description'

const DetailsContainer = styled(withTheme(Container))((props) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  padding: '5px',
  background: props.theme.palette.background.lightgray
}))

const FileDetails = styled(withTheme(Typography))((props) => ({
  color: props.theme.typography.caption.color,
  fontSize: props.theme.typography.caption.fontSize,
  overflowWrap: 'anywhere'
}))

const FileDetailsHeader = styled(Typography)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%'
})

const StyledButton = styled(withTheme(Button))((props) => ({
  backgroundColor: props.theme.palette.secondary.main,
  color: props.theme.palette.primary.dark
}))

const FileBox = styled(withTheme(Box))({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'start'
})

const FileComponent = ({
  filename,
  filesize,
  filehash,
  lastModifiedDate,
  onClick
}) => {
  return (
    <DetailsContainer>
      <FileBox>
        <DescriptionIcon />
        <FileDetailsHeader>
          {filename}{' '}
          <StyledButton onClick={onClick} variant='contained'>
            <DeleteIcon />
          </StyledButton>
        </FileDetailsHeader>
        <br />
      </FileBox>
      <FileDetails>Tamaño: {filesize}</FileDetails>
      <FileDetails>Última modificación: {lastModifiedDate}</FileDetails>
      <FileDetails>Hash: {filehash}</FileDetails>
    </DetailsContainer>
  )
}

FileComponent.propTypes = {
  filename: PropTypes.string,
  filesize: PropTypes.string,
  filehash: PropTypes.string,
  lastModifiedDate: PropTypes.string,
  onClick: PropTypes.func
}

export default FileComponent
