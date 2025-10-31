import { cn } from "@/utils/cn"
import Avatar from "@/components/atoms/Avatar"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"
import { formatDateTime, formatRelativeTime } from "@/utils/formatters"

const ActivityItem = ({ 
  activity, 
  contact,
  className,
  showContact = true,
  variant = "default"
}) => {
  const getActivityIcon = (type) => {
    switch (type.toLowerCase()) {
      case "call": return "Phone"
      case "email": return "Mail"
      case "meeting": return "Calendar"
      case "note": return "FileText"
      case "task": return "CheckSquare"
      case "deal": return "DollarSign"
      default: return "Activity"
    }
  }

  const getActivityColor = (type) => {
    switch (type.toLowerCase()) {
      case "call": return "text-blue-500"
      case "email": return "text-green-500"
      case "meeting": return "text-purple-500"
      case "note": return "text-yellow-500"
      case "task": return "text-red-500"
      case "deal": return "text-accent-500"
      default: return "text-gray-500"
    }
  }

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center space-x-3 py-2", className)}>
        <div className={cn("p-1.5 rounded-full bg-gray-100", getActivityColor(activity.type))}>
          <ApperIcon name={getActivityIcon(activity.type)} size={14} />
        </div>
        <div className="flex-1 min-w-0">
<p className="text-sm text-gray-900 truncate">{activity.description_c || ""}</p>
          <p className="text-xs text-gray-500">{formatRelativeTime(activity.timestamp_c || activity.CreatedOn)}</p>
        </div>
        {showContact && contact && (
          <Avatar name={contact.name} size="sm" />
        )}
      </div>
    )
  }

  return (
    <div className={cn("flex space-x-4 py-4", className)}>
      <div className="flex flex-col items-center">
        <div className={cn("p-2 rounded-full bg-white shadow-sm border-2", getActivityColor(activity.type).replace('text-', 'border-'))}>
          <ApperIcon 
            name={getActivityIcon(activity.type)} 
            size={16} 
            className={getActivityColor(activity.type)}
          />
        </div>
        <div className="w-0.5 bg-gray-200 flex-1 mt-2"></div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
<Badge variant={(activity.type_c || "").toLowerCase()} className="text-xs">
              {activity.type_c}
            </Badge>
            <span className="text-sm text-gray-500">
              {formatRelativeTime(activity.timestamp_c || activity.CreatedOn)}
            </span>
          </div>
{showContact && contact && (
            <div className="flex items-center space-x-2">
              <Avatar name={contact.name_c || contact.Name} size="sm" />
              <span className="text-sm font-medium text-gray-700">{contact.name_c || contact.Name}</span>
            </div>
          )}
        </div>
        
<p className="text-gray-900 mb-2">{activity.description_c || ""}</p>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <ApperIcon name="Calendar" size={14} />
          {formatDateTime(activity.timestamp_c || activity.CreatedOn)}
        </div>
      </div>
    </div>
  )
}

export default ActivityItem