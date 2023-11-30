import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import Divider from '@mui/material/Divider'

import { nodeSchema } from '../utils/schemas'
import { Validator } from '../utils'

const useStyles = makeStyles((theme) => ({
  nodeList: {
    width: '100%',
    padding: 0
  },
  nodeListItem: {
    width: '100%'
  },
  nodeError: {
    color: theme.palette.error.main,
    '& .MuiListItemText-primary, & .MuiListItemText-secondary': {
      color: theme.palette.error.main
    }
  }
}))

const NodesList = ({ nodes, nodesTypes, onEdit, onDelete }) => {
  const classes = useStyles()
  const { validate } = Validator

  return (
    <List className={classes.nodeList}>
      {nodes.map((node, index) => (
        <div className={classes.nodeListItem} key={`org-node-${index}`}>
          <ListItem>
            <ListItemText
              primary={node.node_type}
              secondary={node.location.name}
              className={clsx(classes.nodeList, {
                [classes.nodeError]:
                  !validate(node, nodeSchema) ||
                  !Object.values(nodesTypes || []).includes(node.node_type)
              })}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => onEdit(index)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" onClick={() => onDelete(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </div>
      ))}
    </List>
  )
}

NodesList.propTypes = {
  nodes: PropTypes.array,
  nodesTypes: PropTypes.object,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
}

export default NodesList
