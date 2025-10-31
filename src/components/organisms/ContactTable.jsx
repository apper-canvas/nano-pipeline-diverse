import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Avatar from "@/components/atoms/Avatar";
import { formatPhone, formatRelativeTime } from "@/utils/formatters";
import { cn } from "@/utils/cn";

const ContactTable = ({ 
  contacts, 
  onContactClick,
  onEditContact,
  onDeleteContact,
  className 
}) => {
  const navigate = useNavigate()
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedContacts = [...contacts].sort((a, b) => {
    let aValue = a[sortField] || ""
    let bValue = b[sortField] || ""

if (sortField === "updatedAt" || sortField === "ModifiedOn") {
      aValue = new Date(aValue || 0)
      bValue = new Date(bValue || 0)
    }

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const SortButton = ({ field, children }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center space-x-1 text-left hover:text-primary-600"
    >
      <span>{children}</span>
      <div className="flex flex-col">
        <ApperIcon 
          name="ChevronUp" 
          size={12} 
          className={cn(
            "text-gray-400",
            sortField === field && sortDirection === "asc" && "text-primary-600"
          )}
        />
        <ApperIcon 
          name="ChevronDown" 
          size={12} 
          className={cn(
            "text-gray-400 -mt-1",
            sortField === field && sortDirection === "desc" && "text-primary-600"
          )}
        />
      </div>
    </button>
  )

  return (
    <div className={cn("bg-white rounded-lg shadow-sm overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <SortButton field="name">Contact</SortButton>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <SortButton field="company">Company</SortButton>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact Info
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tags
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <SortButton field="updatedAt">Last Updated</SortButton>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedContacts.map((contact) => (
              <tr 
                key={contact.Id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onContactClick?.(contact)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
<Avatar name={contact.name_c || contact.Name} size="default" />
                  </div>
                  <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">
                        {contact.name_c || contact.Name}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
<div className="text-sm text-gray-900">{contact.company_c || ""}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="space-y-1">
{contact.email_c && (
                      <div className="flex items-center text-sm text-gray-600">
                        <ApperIcon name="Mail" size={14} className="mr-2" />
                        <span className="truncate max-w-[200px]">{contact.email_c}</span>
                      </div>
                    )}
                    {contact.phone_c && (
                      <div className="flex items-center text-sm text-gray-600">
                        <ApperIcon name="Phone" size={14} className="mr-2" />
                        <span>{formatPhone(contact.phone_c)}</span>
                      </div>
                    )}
                  </div>
                </td>
<td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {(() => {
                      const tags = contact.tags_c ? contact.tags_c.split(',').map(t => t.trim()) : []
                      return (
                        <>
                          {tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="default" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {tags.length > 2 && (
                            <Badge variant="default" className="text-xs">
                              +{tags.length - 2}
                            </Badge>
                          )}
                        </>
                      )
                    })()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
{formatRelativeTime(contact.ModifiedOn || contact.CreatedOn)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div 
                    className="flex items-center space-x-2 justify-end"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/contacts/${contact.Id}/edit`)}
                      className="p-1 hover:bg-blue-100 hover:text-blue-600"
                    >
                      <ApperIcon name="Edit2" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteContact?.(contact)}
                      className="p-1 hover:bg-red-100 hover:text-red-600"
                    >
                      <ApperIcon name="Trash2" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ContactTable