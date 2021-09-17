import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles((theme) => ({
  nodeList: {
    width: '100%',
    padding: 0
  },
  nodeListItem: {
    width: '100%'
  }
}))

const NodesList = ({ nodes, onEdit, onDelete }) => {
  const classes = useStyles()

  return (
    <List className={classes.nodeList}>
      {nodes.map((node, index) => (
        <div className={classes.nodeListItem} key={`org-node-${index}`}>
          <ListItem>
            <ListItemText
              primary={node.node_type}
              secondary={node.location.name}
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
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
}

export default NodesList
